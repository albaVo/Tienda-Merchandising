import { Proveedore } from "src/modules/proveedores/entities/proveedore.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryColumn()
    codigo: string;

    @Column('text', { unique: true })
    nombre: string;

    @OneToOne(
        () => Proveedore,
        (proveedor) => proveedor.categoria
    )
    @JoinColumn()
    proveedore?: Proveedore
}
