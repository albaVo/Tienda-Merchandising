import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
