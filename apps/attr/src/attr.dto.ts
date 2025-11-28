import { IsString, IsUUID, IsOptional } from 'class-validator';

export class AttrCreateOneDto {
  @IsString()
  name: string;
}

export class AttrFindOneDto {
  @IsOptional()
  @IsUUID('4')
  id?: string;
  @IsOptional()
  @IsString()
  name?: string;
}

export class AttrDeleteOneDto {
  @IsUUID('4')
  id: string;
}

export class AttrFindAllDto {}
