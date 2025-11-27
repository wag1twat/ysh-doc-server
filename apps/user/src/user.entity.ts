import { CredentialEntity } from '@libs/credential/credential.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  username: string;

  @OneToOne(() => CredentialEntity, (credential) => credential.user)
  credential: CredentialEntity;
}
