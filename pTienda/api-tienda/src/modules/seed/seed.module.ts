import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ClientesModule } from '../clientes/clientes.module';
import { AuthModule } from '../auth/auth.module';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { ProveedoresModule } from '../proveedores/proveedores.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { ProductosModule } from '../productos/productos.module';
import { DetallesPedidosModule } from '../detalles_pedidos/detalles_pedidos.module';
import { PedidosModule } from '../pedidos/pedidos.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ClientesModule,
    AuthModule,
    ProveedoresModule,
    CategoriasModule,
    ProductosModule,
    DetallesPedidosModule,
    PedidosModule
  ]
})
export class SeedModule {}
