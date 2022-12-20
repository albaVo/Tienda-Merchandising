import { Module } from '@nestjs/common';
import { DetallesPedidosService } from './detalles_pedidos.service';
import { DetallesPedidosController } from './detalles_pedidos.controller';
import { DetallesPedido } from './entities/detalles_pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from '../productos/productos.module';
import { Producto } from '../productos/entities/producto.entity';

@Module({
  controllers: [DetallesPedidosController],
  providers: [DetallesPedidosService],
  imports: [
    ProductosModule, 
    TypeOrmModule.forFeature([DetallesPedido, Producto])],
  exports: [DetallesPedidosService],
})
export class DetallesPedidosModule {}
