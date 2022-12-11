import { IsDate, IsDateString, IsString, MinLength } from "class-validator";

export class CreatePedidoDto {
    @IsString()
    @MinLength(1)
    codigo: string;

    @IsDateString()
    fecha_pedido: Date;

    @IsString()
    NIFCliente: string;
}
