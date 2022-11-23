import { Cliente } from 'src/modules/clientes/entities/cliente.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  correo_electronico: string;

  @Column('text', { unique: true })
  redes_sociales: string;

  @OneToOne(
    () => Cliente,
    (cliente) => cliente.usuario,
  )
  @JoinColumn()
  cliente?: Cliente;
}
