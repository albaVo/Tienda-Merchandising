import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriasService } from '../categorias/categorias.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
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

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
