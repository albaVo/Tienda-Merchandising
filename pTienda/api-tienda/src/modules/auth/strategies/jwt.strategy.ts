import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

//export class JwtStrategy extends PassportStrategy(Strategy) {
    
    // constructor (
    //     @InjectRepository (Usuario)
    //     private readonly usuarioRepository: Repository<Usuario>,
    //     configService: ConfigService
    // ){
    //     super({
    //         secretOrKey: configService.get('JWT_SECRET'),
    //         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //         ignoreExpiration: false
    //     })
    // }

    // async validate (payload: JwtPayload): Promise<Usuario> {
    //     const {email} = payload;
    //     const usuario = await this.usuarioRepository.findOneBy({email});

    //     if (!usuario)
    //         throw new UnauthorizedException('Token no válido');
        
    //     if (!usuario.isActive) //existe pero no activo
    //         throw new UnauthorizedException('Usuario no activo');
        
    //     return usuario;
    // }
//}