import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetallesPedidoDto } from './dto/create-detalles_pedido.dto';
import { UpdateDetallesPedidoDto } from './dto/update-detalles_pedido.dto';
import { DetallesPedido } from './entities/detalles_pedido.entity';

@Injectable()
export class DetallesPedidosService {

  constructor(
    @InjectRepository(DetallesPedido)
    private readonly detalles_pedidoRepository: Repository<DetallesPedido>
  ) {}

  async create(createDetallesPedidoDto: CreateDetallesPedidoDto) {
    try {
      const detalles_pedido = this.detalles_pedidoRepository.create(createDetallesPedidoDto);
      await this.detalles_pedidoRepository.save(detalles_pedido);
      return detalles_pedido;
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!')
    }
  }

  findAll() {
    return this.detalles_pedidoRepository.find({});
  }

  findOne(codigo: string) {
    return this.detalles_pedidoRepository.findOne({
      where: {codigo}
    });
  }

  update(id: number, updateDetallesPedidoDto: UpdateDetallesPedidoDto) {
    return `This action updates a #${id} detallesPedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallesPedido`;
  }
}
