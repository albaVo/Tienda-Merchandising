import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  telefono: string;

  @Column('text', { unique: true })
  direccion: string;

  @OneToOne(
    () => Usuario,
    (usuario) => usuario.cliente,
    { cascade: false }
  )
  @JoinColumn()
  usuario?: Usuario;
}
