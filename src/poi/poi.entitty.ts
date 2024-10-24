import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Poi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cep: string;
}
