import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @MinLength(9)
  NIF: string;
  
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  apellidos: string;

  @IsString()
  @MinLength(8)
  telefono: string;

  @IsString()
  @MinLength(5)
  direccion: string;

  @IsString()
  @MinLength(1)
  ciudad: string;
}
