import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUserOneDto {
  @IsString()
  username: string;
}

export class DeleteUserOneDto {
  @IsUUID('4')
  id: string;
}

export class UserFindOneDto {
  @IsString()
  @MinLength(1)
  username: string;
}

export class UserFindAllDto {}
