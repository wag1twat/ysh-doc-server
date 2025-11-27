import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'credentials' })
export class CredentialEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hash: string;
}
