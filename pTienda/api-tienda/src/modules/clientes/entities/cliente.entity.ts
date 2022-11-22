import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { unique: true })
  nombre: string;

  @Column('int', { unique: true })
  telefono: number;

  @Column('text', { unique: true })
  direccion: string;
}
