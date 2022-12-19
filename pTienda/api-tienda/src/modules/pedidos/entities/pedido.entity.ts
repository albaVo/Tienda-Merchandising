import { Cliente } from "src/modules/clientes/entities/cliente.entity";
import { DetallesPedido } from "src/modules/detalles_pedidos/entities/detalles_pedido.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Pedido {
    @PrimaryColumn()
    codigo: string;

    @Column('text')
    fecha_pedido: string;

    @ManyToOne(
        () => Cliente,
        (cliente) => cliente.pedidos,
        { onDelete: 'CASCADE' }
    )
    cliente?: Cliente;

    @OneToOne(
        () => DetallesPedido,
        (detalles_pedido) => detalles_pedido.pedido,
        {onDelete: 'CASCADE'}
    )
    @JoinColumn()
    detalles_pedido: DetallesPedido;
}
