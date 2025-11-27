import { IsString, MinLength } from 'class-validator';

export class CreateUserOneDto {
  @IsString()
  username: string;
}

export class UserFindOneDto {
  @IsString()
  @MinLength(1)
  username: string;
}

export class UserFindAllDto {}
