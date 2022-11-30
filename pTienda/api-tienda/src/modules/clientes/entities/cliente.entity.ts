import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

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
    //{ eager: true, cascade: true }
  )
  @JoinColumn()
  usuario?: Usuario;
}
