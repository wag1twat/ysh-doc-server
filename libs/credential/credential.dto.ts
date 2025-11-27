import { IsUUID } from 'class-validator';

export class CreateCredentialOneDto {}

export class CredentialFindOneDto {
  @IsUUID('4')
  id: string;
}
