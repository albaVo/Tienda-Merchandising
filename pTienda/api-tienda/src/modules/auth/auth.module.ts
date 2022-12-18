import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ClientesModule,
    TypeOrmModule.forFeature([Usuario])
  ],
  exports: [AuthService]
})
export class AuthModule {}
