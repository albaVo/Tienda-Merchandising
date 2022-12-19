import { Producto } from 'src/modules/productos/entities/producto.entity';
import { Proveedore } from 'src/modules/proveedores/entities/proveedore.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryColumn()
  codigo: string;

  @Column('text', { unique: true })
  nombre: string;

  @OneToOne(
    () => Proveedore, 
    (proveedore) => proveedore.categoria,
    {onDelete: 'CASCADE'}
  )
  @JoinColumn()
  proveedore?: Proveedore;

  @OneToMany(() => Producto, (Producto) => Producto.categoria, 
  {
    onDelete: 'CASCADE',
    eager: true,
  })
  productos?: Producto[];
}
