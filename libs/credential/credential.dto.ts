import { UserDTO } from '@apps/user/src/user.dto';
import { IsString, IsUUID } from 'class-validator';

export class CreateCredentialOneDto {
  @IsString()
  hash: string;
  user: UserDTO;
}

export class CredentialFindOneDto {
  @IsUUID('4')
  user: string;
}
