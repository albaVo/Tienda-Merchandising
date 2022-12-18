import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductosService } from '../productos/productos.service';
import { CreateDetallesPedidoDto } from './dto/create-detalles_pedido.dto';
import { UpdateDetallesPedidoDto } from './dto/update-detalles_pedido.dto';
import { DetallesPedido } from './entities/detalles_pedido.entity';

@Injectable()
export class DetallesPedidosService {
  constructor(
    @InjectRepository(DetallesPedido)
    private readonly detalles_pedidoRepository: Repository<DetallesPedido>,
    private readonly productoService: ProductosService,
  ) {}

  async create(createDetallesPedidoDto: CreateDetallesPedidoDto) {
    try {
      const { codigoProducto, ...camposDetallesPedidos } = createDetallesPedidoDto;
      const detalles_pedido = this.detalles_pedidoRepository.create({
        ...camposDetallesPedidos,
      });
      const producto = await this.productoService.findOne(codigoProducto);
      detalles_pedido.productos = producto[0];
      await this.detalles_pedidoRepository.save(detalles_pedido);
      return detalles_pedido;
      // const detalles_pedido = this.detalles_pedidoRepository.create(
      //   createDetallesPedidoDto,
      // );
      // detalles_pedido.codigo = createDetallesPedidoDto[0];
      // const codigoProducto = createDetallesPedidoDto.codigoProducto;
      // const productos = this.productoService.findOne(codigoProducto);
      // detalles_pedido.productos = productos[0];
      // await this.detalles_pedidoRepository.save(detalles_pedido);
      // return detalles_pedido;
    } catch (error) {
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

  update(id: number, updateDetallesPedidoDto: UpdateDetallesPedidoDto) {
    return `This action updates a #${id} detallesPedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallesPedido`;
  }
}
