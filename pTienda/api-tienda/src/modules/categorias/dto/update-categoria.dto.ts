import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { CreateCategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
    @IsString()
    @MinLength(1)
    @IsOptional()
    readonly codigo?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    readonly nombre?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    readonly codigoProveedor?: string;
}
