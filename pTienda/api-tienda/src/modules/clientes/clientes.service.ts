import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly usuarioService: UsuariosService
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      const { codigoUsuario, ...camposCliente } = createClienteDto;
      const cliente = this.clienteRepository.create({...camposCliente});
      const usuario = await this.usuarioService.findOne(codigoUsuario);
      cliente.usuario = usuario[0];
      await this.clienteRepository.save(cliente);
      return cliente
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  findAll() {
    return this.clienteRepository.find({
      relations: ['usuario']
    });
  }

  findOne(NIF: string) {
    return this.clienteRepository.find({
      where: {NIF},
      relations: {pedidos: true}
    })
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
