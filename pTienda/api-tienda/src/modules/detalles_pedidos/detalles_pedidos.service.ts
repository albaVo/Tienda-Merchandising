import { Injectable } from '@nestjs/common';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { CreateDetallesPedidoDto } from './dto/create-detalles_pedido.dto';
import { UpdateDetallesPedidoDto } from './dto/update-detalles_pedido.dto';
import { DetallesPedido } from './entities/detalles_pedido.entity';

@Injectable()
export class DetallesPedidosService {
 
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(DetallesPedido)
    private readonly detalles_pedidoRepository: Repository<DetallesPedido>,
    
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>
  ) {}

  async create(createDetallesPedidoDto: CreateDetallesPedidoDto) {
    try {
      const { codigoProducto, ...camposDetallesPedidos } = createDetallesPedidoDto;
      const detalles_pedido = this.detalles_pedidoRepository.create({
        ...camposDetallesPedidos,
        productos: codigoProducto.map(producto => this.productoRepository.create({codigo: producto}))
      });
      await this.detalles_pedidoRepository.save(detalles_pedido);
      return detalles_pedido;
    } 
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  findAll() {
    return this.detalles_pedidoRepository.find({});
  }

  findOne(codigo: string) {
    return this.detalles_pedidoRepository.findOne({
      where: { codigo },
      relations: { productos: true },
    });
  }

  async update(codigo: string, updateDetallesPedidoDto: UpdateDetallesPedidoDto) {
    const { ...rest } = updateDetallesPedidoDto;
    const detalles_pedido = await this.detalles_pedidoRepository.preload({
      codigo,
      ...rest
    });

    if(!detalles_pedido) throw new NotFoundException(`Detalle_Pedido con codigo ${codigo} no encontrado`);

    //crear Query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(detalles_pedido);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.findOne(codigo);
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBErrors(error)
    }
  }

  async remove(codigo: string) {
    const detalles_pedido = await this.findOne(codigo);
    await this.detalles_pedidoRepository.remove(detalles_pedido)
  }

  async deleteAllDetalles_Pedidos() {
    const query = this.detalles_pedidoRepository.createQueryBuilder('detalles_pedido');
    try {
      return await query
      .delete()
      .where({})
      .execute();
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  
  private handleDBErrors(error: any): never {
    if (error.code === '23505'){
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Please Check Server Error ...');
  }
}
