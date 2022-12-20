import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { ClientesModule } from '../clientes/clientes.module';
//import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService,// JwtStrategy
],
  imports: [
    ClientesModule,
    TypeOrmModule.forFeature([Usuario]),
    // PassportModule.register({defaultStrategy: 'jwt'}),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     console.log ('JWT_SECRET --> ', configService.get('JWT_SECRET'));
    //     return {
    //       secret: configService.get('JWT_SECRET'),
    //       signOptions: {expiresIn: '2h'}
    //     }
    //   }
    // }),
  ],
  exports: [AuthService, //TypeOrmModule, JwtStrategy, PassportModule, JwtModule
]
})
export class AuthModule {}
