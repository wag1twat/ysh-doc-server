import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { docSwagger } from './doc.swagger';

@Entity({ name: 'docs' })
export class DocEntity {
  @ApiProperty(docSwagger.id)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty(docSwagger.name)
  @Column({ length: 100, unique: true })
  name: string;
}
