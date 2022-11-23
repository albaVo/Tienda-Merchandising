import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
