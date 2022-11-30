import { IsEmail, isEmail, IsString, MinLength } from "class-validator";

export class CreateProveedoreDto {
    @IsString()
    @MinLength(1)
    codigo: string;
    
    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(8)
    telefono: string;

    @IsString()
    @MinLength(5)
    direccion: string;

    @IsEmail()
    @MinLength(5)
    email: string;

    @IsString()
    @MinLength(4)
    website: string;
}
