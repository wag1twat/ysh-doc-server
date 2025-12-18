import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { DeleteResult } from 'typeorm';

export class DeleteEntityResponseDTO implements DeleteResult {
  @ApiProperty({
    description: 'Количество удаленных сущностей',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  affected?: number | null | undefined;

  raw: any;
}
