import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsOptional,
  IsArray,
  MinLength,
} from 'class-validator';
import { AttrGroupEntity } from './entities/attr-group.entity';
import { attrGroupSwagger } from './attr-group.swagger';
import { DeleteEntityResponseDTO } from '@libs/base.dto';

export class AttrGroupCreateOneDto {
  @ApiProperty(attrGroupSwagger.name)
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty(attrGroupSwagger.attributes)
  @IsArray()
  @IsUUID('4', { each: true })
  attributes: string[];

  static buildSwagger() {
    return applyDecorators(
      ApiTags(attrGroupSwagger.tag),
      ApiOkResponse({
        description: 'Группа атрибутов успешно создан',
        type: AttrGroupEntity,
      }),
    );
  }
}

export class AttrGroupFindOneDto {
  @ApiProperty(attrGroupSwagger.id)
  @IsOptional()
  @IsUUID('4')
  id?: string;
  @ApiProperty(attrGroupSwagger.name)
  @IsOptional()
  @IsString()
  name?: string;

  static buildSwagger() {
    return applyDecorators(
      ApiTags(attrGroupSwagger.tag),
      ApiOkResponse({
        description: 'Группа атрибутов успешно найдена',
        type: AttrGroupEntity,
      }),
    );
  }
}

export class AttrGroupDeleteOneDto {
  @ApiProperty(attrGroupSwagger.id)
  @IsUUID('4')
  id: string;

  static buildSwagger() {
    return applyDecorators(
      ApiTags(attrGroupSwagger.tag),
      ApiOkResponse({
        description: 'Группа атрибутов успешно удалена',
        type: DeleteEntityResponseDTO,
      }),
    );
  }
}

export class AttrGroupFindAllDto {
  @ApiProperty(attrGroupSwagger.ids)
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  ids?: string[];

  static buildSwagger() {
    return applyDecorators(
      ApiTags(attrGroupSwagger.tag),
      ApiOkResponse({
        description: 'Поиск группы атрибутов / получение всех группы атрибутов',
        type: [AttrGroupEntity],
      }),
    );
  }
}
