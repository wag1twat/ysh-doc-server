import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { docSwagger } from './doc.swagger';
import { DocEntity } from './doc.entity';
import { applyDecorators } from '@nestjs/common';

export class DocFindOneDto {
  @ApiProperty(docSwagger.id)
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @ApiProperty(docSwagger.name)
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  static buildSwagger() {
    return applyDecorators(
      ApiTags(docSwagger.tag),
      ApiOkResponse({
        description: 'Документ успешно найдена',
        type: DocEntity,
      }),
    );
  }
}

export class DocFindAllDto {
  @ApiProperty(docSwagger.ids)
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  ids?: string[];

  static buildSwagger() {
    return applyDecorators(
      ApiTags(docSwagger.tag),
      ApiOkResponse({
        description: 'Поиск документов / получение всех документов',
        type: [DocEntity],
      }),
    );
  }
}
