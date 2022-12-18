import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ClientesModule } from '../clientes/clientes.module';
import { AuthModule } from '../auth/auth.module';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { ProveedoresModule } from '../proveedores/proveedores.module';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ClientesModule,
    AuthModule,
    ProveedoresModule,
    CategoriasModule
  ]
})
export class SeedModule {}
