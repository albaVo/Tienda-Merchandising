import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsNumber()
  @MinLength(8)
  telefono: number;

  @IsString()
  @MinLength(5)
  direccion: string;
}
