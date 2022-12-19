import { Cliente } from "src/modules/clientes/entities/cliente.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

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

  @Column('bool', {default: true})
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['usuario']
  })
  roles: string[];

  @OneToOne(
    () => Cliente,
    (cliente) => cliente.usuario,
    {onDelete: 'CASCADE'}
  )
  @JoinColumn()
  cliente?: Cliente;
}
