import { IsString, MinLength, IsEmail, MaxLength, Matches } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @MinLength(1)
    codigo: string;
  
    @IsString()
    @MinLength(1)
    username: string;
  
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener una letra MAYÚSCULA, minúscula y un número'
    })
    contraseña: string;

    @IsEmail()
    @MinLength(5)
    email: string;
  
    @IsString()
    @MinLength(1)
    twitter: string;
  
    @IsString()
    @MinLength(1)
    website: string;
  
    @IsString()
    @MinLength(1)
    NIFCliente: string;
  }
