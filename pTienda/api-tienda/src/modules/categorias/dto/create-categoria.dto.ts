import { IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    @MinLength(1)
    codigo: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    codigoProveedor: string;
}
