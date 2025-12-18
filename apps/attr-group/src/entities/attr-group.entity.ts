import { AttrEntity } from '@apps/attr/src/entities/attr.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'attr_groups' })
export class AttrGroupEntity {
  @ApiProperty({
    description: 'Идентификатор группы атрибутов в фомарте uuidv4',
    example: 'c76abba6-7717-4dcd-b620-b026b9b1b8ad',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Имя группы атрибутов',
    example: 'attribute group',
  })
  @Column({ length: 100, unique: true })
  name: string;

  @ApiProperty({
    description:
      'Идентификаторы атрибутов включенных в группу в фомарте uuidv4',
    example: ['c76abba6-7717-4dcd-b620-b026b9b1b8ad'],
  })
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
