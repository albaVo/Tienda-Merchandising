import { Categoria } from "src/modules/categorias/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Producto {
    @PrimaryColumn()
    codigo: string;

    @Column('text', { unique: true })
    nombre: string;

    @Column('text')
    thumbnail: string;

    @Column('text')
    tipo: string;

    @Column('text', { array: true })
    tallas?: string[];

    @Column('numeric')
    precio: number;

    @Column('text')
    estado: string;

    @Column({
        type: 'int',
        default: 0
    })
    stock: number;

    @ManyToOne(
        () => Categoria,
        (categoria) => categoria.productos,
        { cascade: false }
    )
    categoria?: Categoria;
}
