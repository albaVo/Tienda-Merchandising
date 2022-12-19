import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly dataSource: DataSource,
    
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

  async login (loginUsuarioDto: LoginUsuarioDto) {
    try {
      // buscamos el usuario del email
      const { email, contraseña } = loginUsuarioDto;
      const usuario = await this.usuarioRepository.findOne({
        where: {email},
        select: {email: true, contraseña: true}
      });

      if (!usuario)
        throw new UnauthorizedException ('Credenciales no válidas (email)');
      
      // comparamos las contraseñas
      if (!bcrypt.compareSync(contraseña, usuario.contraseña))
        throw new UnauthorizedException ('Credenciales no válidas (email)');

      return usuario;
    }
    catch (error) {
      this.handleDBErrors (error)
    }
  }

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

  async update(codigo: string, updateAuthDto: UpdateAuthDto) {
    const { ...rest } = updateAuthDto;
    const usuario = await this.usuarioRepository.preload({
      codigo,
      ...rest
    });

    if(!usuario) throw new NotFoundException(`Usuario con código ${codigo} no encontrado`);

    //crear Query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //guardamos la info del usuario pero NO SE GUARDA EN LA BD
      await queryRunner.manager.save(usuario);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      // return (usuario)
      return this.findOne(codigo);
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBErrors(error)
    }
  }

  async remove(codigo: string) {
    const usuario = await this.findOne(codigo);
    await this.usuarioRepository.remove(usuario)
  }

  async deleteAllUsuarios() {
    const query = this.usuarioRepository.createQueryBuilder('usuario');
    try {
      return await query
      .delete()
      .where({})
      .execute();
    } 
    catch (error) {
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
