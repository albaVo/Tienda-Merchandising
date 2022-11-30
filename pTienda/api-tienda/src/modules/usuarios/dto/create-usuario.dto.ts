import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(1)
  codigo: string;

  @IsString()
  @MinLength(1)
  username: string;

  @IsEmail()
  @MinLength(5)
  email: string;

  @IsString()
  @MinLength(1)
  twitter: string;

  @IsString()
  @MinLength(1)
  website: string;
}
