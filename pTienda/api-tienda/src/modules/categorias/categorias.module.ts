import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { ProveedoresModule } from '../proveedores/proveedores.module';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService],
  imports: [
    ProveedoresModule,
    TypeOrmModule.forFeature([Categoria])
  ],
  exports: [ CategoriasService ]
})
export class CategoriasModule {}
