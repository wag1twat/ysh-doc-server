import { AttrGroupEntity } from '@apps/attr-group/src/entities/attr-group.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity({ name: 'attrs' })
export class AttrEntity {
  @ApiProperty({
    description: 'Идентификатор атрибута в фомарте uuidv4',
    example: 'c76abba6-7717-4dcd-b620-b026b9b1b8ad',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Имя атрибута',
    example: 'attribute',
  })
  @Column({ length: 100, unique: true })
  name: string;

  @ApiProperty({
    description: 'Группы атрибутов в которые включен атрибут',
    type: [AttrGroupEntity],
  })
  @ManyToMany(() => AttrGroupEntity, (attrGroup) => attrGroup.attributes)
  groups: AttrGroupEntity[];
}
