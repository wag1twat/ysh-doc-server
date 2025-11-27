import { UserEntity } from '@apps/user/src/user.entity';
import { IsString, IsUUID } from 'class-validator';

export class CreateCredentialOneDto {
  @IsString()
  hash: string;
  user: UserEntity;
}

export class CredentialFindOneDto {
  @IsUUID('4')
  user: string;
}
