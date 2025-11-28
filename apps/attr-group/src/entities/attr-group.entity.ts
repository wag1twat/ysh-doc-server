import { AttrEntity } from '@apps/attr/src/entities/attr.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'attr_groups' })
export class AttrGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  name: string;

  @ManyToMany(() => AttrEntity, (attr) => attr.groups)
  @JoinTable({
    name: 'attr_group_attributes',
    joinColumn: {
      name: 'attr_group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'attr_id',
      referencedColumnName: 'id',
    },
  })
  attributes: AttrEntity[];
}
