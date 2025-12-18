import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsOptional,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { AttrEntity } from './entities/attr.entity';
import { attrSwagger } from './attr.swagger';
import { DeleteEntityResponseDTO } from '@libs/base.dto';

export class CreateOneAttrDTO {
  @ApiProperty(attrSwagger.name)
  @IsString()
  @MinLength(1)
  name: string;

  static buildSwagger() {
    return applyDecorators(
      ApiTags(attrSwagger.tag),
      ApiOkResponse({
        description: 'Атрибут успешно создан',
        type: AttrEntity,
      }),
    );
  }
}

export class FindOneAttrDTO {
  @ApiProperty(attrSwagger.id)
  @IsOptional()
  @IsUUID('4')
  id?: string;
  @ApiProperty(attrSwagger.name)
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  static buildSwagger() {
    return applyDecorators(
      ApiTags(attrSwagger.tag),
      ApiOkResponse({
        description: 'Атрибут успешно найден',
        type: AttrEntity,
      }),
    );
  }
}

export class DeleteOneAttrDTO {
  @ApiProperty(attrSwagger.id)
  @IsUUID('4')
  id: string;

  static buildSwagger() {
    return applyDecorators(
      ApiTags(attrSwagger.tag),
      ApiOkResponse({
        description: 'Атрибут успешно удален',
        type: DeleteEntityResponseDTO,
      }),
    );
  }
}

export class FindAllAttrDTO {
  @IsOptional()
  @IsBoolean()
  withGroups?: boolean;

  static buildSwagger() {
    return applyDecorators(
      ApiTags(attrSwagger.tag),
      ApiOkResponse({
        description: 'Поиск атрибутов / получение всех атрибутов',
        type: [AttrEntity],
      }),
    );
  }
}
