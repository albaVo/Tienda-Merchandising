import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateDetallesPedidoDto {
    @IsString()
    @MinLength(2)
    codigo: string;

    @IsNumber()
    @IsPositive()
    cantidad: number; 
    
    @IsNumber()
    @IsPositive()
    precio_total: number;

    @IsString()
    codigoProducto: string[];
}
