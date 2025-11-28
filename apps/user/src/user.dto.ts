import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateUserOneDto {
  @IsString()
  @MinLength(1)
  username: string;
}

export class DeleteUserOneDto {
  @IsUUID('4')
  id: string;
}

export class UserFindOneDto {
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  username?: string;
}

export class UserFindAllDto {
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  ids?: string[];
}
