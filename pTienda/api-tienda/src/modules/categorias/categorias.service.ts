import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {

  constructor(
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

  update(codigo: string, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action update a #${codigo} categoria`;
  }

  remove(codigo: string) {
    return `This action removes a #${codigo} categoria`;
  }
}
