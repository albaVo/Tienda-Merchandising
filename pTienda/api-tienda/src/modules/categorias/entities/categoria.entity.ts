import { Producto } from "src/modules/productos/entities/producto.entity";
import { Proveedore } from "src/modules/proveedores/entities/proveedore.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryColumn()
    codigo: string;

    @Column('text', { unique: true })
    nombre: string;

    @OneToOne(
        () => Proveedore,
        (proveedore) => proveedore.categoria
    )
    @JoinColumn()
    proveedore?: Proveedore;

    @OneToMany(
        () => Producto,
        (Producto) => Producto.categoria,
        { cascade: false, eager: true }
    )
    productos?: Producto[];


}
