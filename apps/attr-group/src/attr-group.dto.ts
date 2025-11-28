import { IsString, IsUUID, IsOptional, IsArray } from 'class-validator';

export class AttrGroupCreateOneDto {
  @IsString()
  name: string;

  @IsArray()
  @IsUUID('4', { each: true })
  attributes: string[];
}

export class AttrGroupFindOneDto {
  @IsOptional()
  @IsUUID('4')
  id?: string;
  @IsOptional()
  @IsString()
  name?: string;
}

export class AttrGroupDeleteOneDto {
  @IsUUID('4')
  id: string;
}

export class AttrGroupFindAllDto {}
