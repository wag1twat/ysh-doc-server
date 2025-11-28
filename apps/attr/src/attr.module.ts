import { Module } from '@nestjs/common';
import { AttrController } from './attr.controller';
import { AttrService } from './attr.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttrEntity } from './entities/attr.entity';
import { DB_CONNECTION } from '@libs/constant';
import { AttrGroupEntity } from '@apps/attr-group/src/entities/attr-group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttrEntity, AttrGroupEntity], DB_CONNECTION),
  ],
  controllers: [AttrController],
  providers: [AttrService],
})
export class AttrModule {}
