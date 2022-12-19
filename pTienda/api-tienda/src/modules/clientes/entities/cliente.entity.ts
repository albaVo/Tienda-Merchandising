import { Pedido } from 'src/modules/pedidos/entities/pedido.entity';
import { Usuario } from 'src/modules/auth/entities/usuario.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryColumn()
  NIF: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  apellidos: string;

  @Column('text', { unique: true })
  telefono: string;

  @Column('text', { nullable: true })
  direccion: string;

  @Column('text', { nullable: true })
  ciudad: string;

  @OneToOne(
    () => Usuario,
    (usuario) => usuario.cliente,
    { onDelete: 'CASCADE' }
  )
  usuario?: Usuario;

  @OneToMany(
    () => Pedido,
    (pedido) => pedido.cliente,
    { onDelete: 'CASCADE', eager: true }
  )
  pedidos?: Pedido[];
}
