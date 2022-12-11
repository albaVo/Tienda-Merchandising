import { Pedido } from "src/modules/pedidos/entities/pedido.entity";
import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class DetallesPedido {
    @PrimaryColumn()
    codigo: string;

    @Column('numeric')
    cantidad: number;

    @Column('numeric')
    precio_total: number;

    @OneToOne(
        () => Pedido,
        (pedido) => pedido.detalles_pedido,
        { cascade: false }
    )
    pedido?: Pedido;
}
