import { IsDate, IsDateString, IsString, MinLength } from "class-validator";

export class CreatePedidoDto {
    @IsString()
    @MinLength(1)
    codigo: string;

    @IsString()
    fecha_pedido: string;

    @IsString()
    NIFCliente: string;

    @IsString()
    codigoDetallesPedido: string;
}
