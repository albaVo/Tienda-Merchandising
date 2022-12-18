import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class AuthService {

  

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly clienteService: ClientesService
  ){}
  
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { NIFCliente, contraseña, ...usuarioData } = createUsuarioDto;
      const usuario = this.usuarioRepository.create({
        ...usuarioData,
        contraseña: bcrypt.hashSync( contraseña, 10 )
      });
      const cliente = await this.clienteService.findOne(NIFCliente);
      usuario.cliente = cliente[0];
      await this.usuarioRepository.save(usuario);
      //delete usuario.contraseña;
      return usuario;
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  // async login (loginUsuarioDto: LoginUsuarioDto) {

  // }

  findAll() {
    return this.usuarioRepository.find({
      relations: {cliente: true}
    });
  }

  findOne(codigo: string) {
    return this.usuarioRepository.find({
      where: {codigo}
    });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  // async deleteAllUsuarios() {
  //   const query = this.usuarioRepository.createQueryBuilder('usuario');
  //   try {
  //     return await query
  //     .delete()
  //     .where({})
  //     .execute();
  //   } 
  //   catch (error) {
  //     this.handleDBErrors(error);
  //   }
  // }

  private handleDBErrors(error: any): never {
    if (error.code === '23505'){
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Please Check Server Error ...');
  }
}
