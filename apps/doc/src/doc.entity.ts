import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'docs' })
export class DocEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  name: string;
}
