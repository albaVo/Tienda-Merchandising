import { IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(5)
  correo_electronico: string;

  @IsString()
  @MinLength(1)
  redes_sociales: string;
}
