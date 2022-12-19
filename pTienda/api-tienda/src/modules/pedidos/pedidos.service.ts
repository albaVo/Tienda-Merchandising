import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ClientesService } from '../clientes/clientes.service';
import { DetallesPedidosService } from '../detalles_pedidos/detalles_pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {

  constructor(
    private readonly dataSource: DataSource,
    
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    private readonly clienteService: ClientesService,
    private readonly detalles_pedidoService: DetallesPedidosService
  ){}

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      const { codigoDetallesPedido, NIFCliente, ...camposPedido } = createPedidoDto;
      const pedido = this.pedidoRepository.create({...camposPedido});
      const cliente = await this.clienteService.findOne(NIFCliente);
      const detalles_pedido = await this.detalles_pedidoService.findOne(codigoDetallesPedido);
      pedido.cliente = cliente[0];
      pedido.detalles_pedido = detalles_pedido;
      await this.pedidoRepository.save(pedido);
      return pedido;
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  findAll() {
    return this.pedidoRepository.find({
      relations: ['detalles_pedido']
    });
  }

  findOne(codigo: string) {
    return this.pedidoRepository.findOne({
      where: {codigo},
      relations: {detalles_pedido: true}
    })
  }

  async update(codigo: string, updatePedidoDto: UpdatePedidoDto) {
    const { ...rest } = updatePedidoDto;
    const pedido = await this.pedidoRepository.preload({
      codigo,
      ...rest
    });

    if(!pedido) throw new NotFoundException(`Pedido con codigo ${codigo} no encontrado`);

    //crear Query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(pedido);
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
    const pedido = await this.findOne(codigo);
    await this.pedidoRepository.remove(pedido)
  }

  async deleteAllPedidos() {
    const query = this.pedidoRepository.createQueryBuilder('pedido');
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
