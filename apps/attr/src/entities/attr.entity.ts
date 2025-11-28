import { AttrGroupEntity } from '@apps/attr-group/src/entities/attr-group.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity({ name: 'attrs' })
export class AttrEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  name: string;

  @ManyToMany(() => AttrGroupEntity, (attrGroup) => attrGroup.attributes)
  groups: AttrGroupEntity[];
}
