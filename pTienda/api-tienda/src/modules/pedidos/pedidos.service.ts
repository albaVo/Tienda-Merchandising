import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientesService } from '../clientes/clientes.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {

  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    private readonly clienteService: ClientesService
  ){}

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      const { NIFCliente, ...camposPedido } = createPedidoDto;
      const pedido = this.pedidoRepository.create({...camposPedido});
      const cliente = await this.clienteService.findOne(NIFCliente);
      pedido.cliente = cliente[0];
      await this.pedidoRepository.save(pedido);
      return cliente
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  findAll() {
    return this.pedidoRepository.find({});
  }

  findOne(codigo: string) {
    return this.pedidoRepository.findOne({
      where: {codigo}
    })
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
