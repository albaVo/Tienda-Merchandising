import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientesService } from '../clientes/clientes.service';
import { DetallesPedidosService } from '../detalles_pedidos/detalles_pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {

  constructor(
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

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
