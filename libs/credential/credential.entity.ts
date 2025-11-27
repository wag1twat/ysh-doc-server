import { UserEntity } from '@apps/user/src/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'credentials' })
export class CredentialEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hash: string;

  @OneToOne(() => UserEntity, (user) => user.credential, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
