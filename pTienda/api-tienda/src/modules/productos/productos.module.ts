import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
    CategoriasModule,
    TypeOrmModule.forFeature([Producto])
  ],
  exports: [ProductosService, TypeOrmModule]
})
export class ProductosModule {}
