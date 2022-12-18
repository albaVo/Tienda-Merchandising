import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.categoriasService.findOne(codigo);
  }

  @Patch(':codigo')
  update(@Param('codigo') codigo: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(codigo, updateCategoriaDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.categoriasService.remove(codigo);
  }
}
