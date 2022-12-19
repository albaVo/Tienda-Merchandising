import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Proveedore } from './entities/proveedore.entity';

@Injectable()
export class ProveedoresService {

  private readonly logger = new Logger('ProveedoresService');

  constructor(
    private readonly dataSource: DataSource,
    
    @InjectRepository(Proveedore)
    private readonly proveedorRepository: Repository<Proveedore>
  ){}

  async create(createProveedoreDto: CreateProveedoreDto) {
    try {
      const proveedor = this.proveedorRepository.create(createProveedoreDto);
      await this.proveedorRepository.save(proveedor);
      return proveedor;
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!')
    }
  }

  findAll() {
    return this.proveedorRepository.find({});
  }

  findOne(codigo: string) {
    return this.proveedorRepository.find({
      where: {codigo}
    })
  }

  async update(codigo: string, updateProveedoreDto: UpdateProveedoreDto) {
    const { ...rest } = updateProveedoreDto;
    const proveedor = await this.proveedorRepository.preload({
      codigo,
      ...rest
    });

    if(!proveedor) throw new NotFoundException(`Proveedor con codigo ${codigo} no encontrado`);

    //crear Query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(proveedor);
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
    const proveedor = await this.findOne(codigo);
    await this.proveedorRepository.remove(proveedor)
  }

  async deleteAllProveedores() {
      const query = this.proveedorRepository.createQueryBuilder('proveedor');
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
      this.logger.error(error);
      throw new InternalServerErrorException('Please Check Server Error ...');
    }
}
