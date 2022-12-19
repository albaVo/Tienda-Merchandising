import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CategoriasService } from '../categorias/categorias.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {

  constructor(
    private readonly dataSource: DataSource,
    
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly categoriaService: CategoriasService,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const { codigoCategoria, ...camposProducto } = createProductoDto;
      const producto = this.productoRepository.create({ ...camposProducto });
      const categoria = await this.categoriaService.findOne(codigoCategoria);
      producto.categoria = categoria;
      await this.productoRepository.save(producto);
      return producto;
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException('Ayuda!');
    }
  }

  findAll() {
    return this.productoRepository.find({});
  }

  findOne(codigo: string) {
    return this.productoRepository.findOne({
      where: { codigo },
    });
  }

  async update(codigo: string, updateProductoDto: UpdateProductoDto) {
    const { ...rest } = updateProductoDto;
    const producto = await this.productoRepository.preload({
      codigo,
      ...rest
    });

    if(!producto) throw new NotFoundException(`Producto con codigo ${codigo} no encontrado`);

    //crear Query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(producto);
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
    const producto = await this.findOne(codigo);
    await this.productoRepository.remove(producto)
  }

  async deleteAllProductos() {
    const query = this.productoRepository.createQueryBuilder('producto');
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
