import { Cliente } from "src/modules/clientes/entities/cliente.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Pedido {
    @PrimaryColumn()
    codigo: string;

    @Column('date')
    fecha_pedido: Date;

    @ManyToOne(
        () => Cliente,
        (cliente) => cliente.pedidos,
        { cascade: false }
    )
    cliente?: Cliente;
}
