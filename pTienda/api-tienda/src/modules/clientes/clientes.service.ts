import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {

  constructor(
    private readonly dataSource: DataSource,
    
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      const cliente = this.clienteRepository.create(createClienteDto);
      await this.clienteRepository.save(cliente);
      return cliente;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  findAll() {
    return this.clienteRepository.find({});
  }

  findOne(NIF: string) {
    return this.clienteRepository.find({
      where: { NIF },

    });
  }

  async update(NIF: string, updateClienteDto: UpdateClienteDto) {
    const { ...rest } = updateClienteDto;
    const cliente = await this.clienteRepository.preload({
      NIF,
      ...rest
    });

    if(!cliente) throw new NotFoundException(`Cliente con NIF ${NIF} no encontrado`);

    //crear Query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //guardamos la info del cliente pero NO SE GUARDA EN LA BD
      await queryRunner.manager.save(cliente);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      // return (cliente)
      return this.findOne(NIF);
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBErrors(error)
    }
  }

  async remove(NIF: string) {
    const cliente = await this.findOne(NIF);
    await this.clienteRepository.remove(cliente)
  }

  async deleteAllClientes() {
    const query = this.clienteRepository.createQueryBuilder('cliente');
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
