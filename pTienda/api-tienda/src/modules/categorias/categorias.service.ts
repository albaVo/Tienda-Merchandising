import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {

  // private readonly logger = new Logger('CategoriasService');
  
  
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    private readonly proveedorService: ProveedoresService
  ){}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const { codigoProveedor, ...camposCategoria } = createCategoriaDto;
      const categoria = this.categoriaRepository.create({...camposCategoria});
      const proveedore = await this.proveedorService.findOne(codigoProveedor);
      categoria.proveedore = proveedore[0];
      await this.categoriaRepository.save(categoria);
      return categoria
    }
    catch(error){
      console.log(error);
      return new InternalServerErrorException('Ayuda!')
    }
  }

  findAll() {
    return this.categoriaRepository.find({
      relations: ['proveedore']
    });
  }

  findOne(codigo: string) {
    return this.categoriaRepository.findOne({
      where: {codigo},
      relations: {proveedore: true, productos: true},
      
    })
  }

  async update(codigo: string, updateCategoriaDto: UpdateCategoriaDto) {
    const { ...rest } = updateCategoriaDto;
    const categoria = await this.categoriaRepository.preload({
      codigo,
      ...rest
    });

    if(!categoria) throw new NotFoundException(`Categoria con código ${codigo} no encontrada`);

    //crear Query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //guardamos la info de la categoria pero NO SE GUARDA EN LA BD
      await queryRunner.manager.save(categoria);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      // return (categoria)
      return this.findOne(codigo);
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBErrors(error)
    }
  }

  async remove(codigo: string) {
    const categoria = await this.findOne(codigo);
    await this.categoriaRepository.remove(categoria)
  }

  async deleteAllCategorias() {
    const query = this.categoriaRepository.createQueryBuilder('categoria');
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
    // this.logger.error(error);
    throw new InternalServerErrorException('Please Check Server Error ...');
  }
}
