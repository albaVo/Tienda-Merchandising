import { Pedido } from 'src/modules/pedidos/entities/pedido.entity';
import { Producto } from 'src/modules/productos/entities/producto.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

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
    {onDelete: 'CASCADE'}
  )
  pedido?: Pedido;

  @ManyToMany(
    () => Producto, 
    (producto) => producto.detalles_pedidos,
    {onDelete: 'CASCADE'}
  )
  @JoinTable({
    name: 'detalles_pedidos_productos',
    joinColumn: {
      name: 'detalles_pedidosCodigo',
    },
    inverseJoinColumn: {
      name: 'productosCodigo',
    },
  })
  productos: Producto[];
}
