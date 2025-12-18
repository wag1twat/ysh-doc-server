import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { userSwagger } from './user.swagger';
import { UserEntity } from './user.entity';
import { applyDecorators } from '@nestjs/common';
import { DeleteEntityResponseDTO } from '@libs/base.dto';

export class UserDTO implements Omit<UserEntity, 'credential'> {
  @ApiProperty(userSwagger.id)
  @IsUUID('4')
  id: string;
  @ApiProperty(userSwagger.username)
  @IsString()
  @MinLength(1)
  username: string;
}

export class CreateOneUserDTO {
  @ApiProperty(userSwagger.username)
  @IsString()
  @MinLength(1)
  username: string;
}

export class DeleteOneUserDTO {
  @ApiProperty(userSwagger.id)
  @IsUUID('4')
  id: string;

  static buildSwagger() {
    return applyDecorators(
      ApiTags(userSwagger.tag),
      ApiOkResponse({
        description: 'Пользователь успешно удален',
        type: DeleteEntityResponseDTO,
      }),
    );
  }
}

export class FindOneUserDTO {
  @ApiProperty(userSwagger.id)
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @ApiProperty(userSwagger.username)
  @IsOptional()
  @IsString()
  @MinLength(1)
  username?: string;

  static buildSwagger() {
    return applyDecorators(
      ApiTags(userSwagger.tag),
      ApiOkResponse({
        description: 'Пользователь успешно найден',
        type: UserDTO,
      }),
    );
  }
}

export class FindAllUserDTO {
  @ApiProperty(userSwagger.ids)
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  ids?: string[];

  static buildSwagger() {
    return applyDecorators(
      ApiTags(userSwagger.tag),
      ApiOkResponse({
        description: 'Поиск пользователей / получение всех пользователей',
        type: [UserDTO],
      }),
    );
  }
}
