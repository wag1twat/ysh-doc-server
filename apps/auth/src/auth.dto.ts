import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { authSwagger } from './auth.swagger';
import { UserDTO } from '@apps/user/src/user.dto';

export class AuthSignUpDto {
  @ApiProperty(authSwagger.username)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  username: string;

  @ApiProperty(authSwagger.password)
  @IsString()
  @MinLength(1)
  password: string;

  static buildSwagger() {
    return applyDecorators(
      ApiTags(authSwagger.tag),
      ApiOkResponse({
        description: 'Пользователь успешно зарегистировался',
        type: UserDTO,
      }),
    );
  }
}

export class AuthSignInDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'admin',
  })
  @IsString()
  @MinLength(1)
  username: string;

  @ApiProperty({
    description: 'Пароль',
    example: 'admin',
  })
  @IsString()
  @MinLength(1)
  password: string;

  static buildSwagger() {
    return applyDecorators(
      ApiTags(authSwagger.tag),
      ApiOkResponse({
        description: 'Пользователь успешно вошел в систему',
        type: AuthSignInResponseDto,
      }),
    );
  }
}

export class AuthSignInResponseDto {
  @ApiProperty(authSwagger.access_token)
  @IsString()
  access_token: string;
}
