import { Categoria } from "src/modules/categorias/entities/categoria.entity";
import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proveedore {
    @PrimaryColumn()
    codigo: string;

    @Column('text', { unique: true })
    nombre: string;

    @Column('text', { unique: true })
    telefono: string;

    @Column('text', { unique: true })
    direccion: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { unique: true })
    website: string;

    @OneToOne(
        () => Categoria,
        (categoria) => categoria.proveedore,
        { onDelete: 'CASCADE' }
    )
    categoria: Categoria
}