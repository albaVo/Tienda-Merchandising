import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ProductosModule } from './modules/productos/productos.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { DetallesPedidosModule } from './modules/detalles_pedidos/detalles_pedidos.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { ProveedoresModule } from './modules/proveedores/proveedores.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientesModule,
    ProductosModule,
    PedidosModule,
    UsuariosModule,
    DetallesPedidosModule,
    CategoriasModule,
    ProveedoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
