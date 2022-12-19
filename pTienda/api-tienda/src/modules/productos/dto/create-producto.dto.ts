import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductoDto {
    @IsString()
    @MinLength(1)
    codigo: string;

    @IsString()
    @MinLength(3)
    nombre: string;

    @IsString()
    @IsOptional()
    thumbnail?: string;

    @IsString()
    @MinLength(1)
    tipo: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tallas?: string[];

    @IsInt()
    @IsPositive()
    precio: number;

    @IsIn(['DISPONIBLE', 'NO DISPONIBLE'])
    estado: string;

    @IsInt()
    @IsPositive()
    stock: number;

    @IsString()
    codigoCategoria?: string;
}
