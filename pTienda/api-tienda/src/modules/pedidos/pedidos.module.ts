import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { ClientesModule } from '../clientes/clientes.module';
import { DetallesPedidosModule } from '../detalles_pedidos/detalles_pedidos.module';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
  imports: [
    ClientesModule,
    DetallesPedidosModule,
    TypeOrmModule.forFeature([Pedido])
  ],
  exports: [PedidosService]
})
export class PedidosModule {}
