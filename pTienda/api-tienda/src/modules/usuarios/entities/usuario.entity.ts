import { Cliente } from 'src/modules/clientes/entities/cliente.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryColumn()
  codigo: string;

  @Column('text', { unique: true })
  username: string;

  @Column('text')
  contraseña?: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  twitter: string;

  @Column('text', { nullable: true })
  website: string;

  @OneToOne(
    () => Cliente,
    (cliente) => cliente.usuario,
    { cascade: false }
  )
  cliente?: Cliente;
}
