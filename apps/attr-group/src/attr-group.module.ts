import { Module } from '@nestjs/common';
import { AttrGroupController } from './attr-group.controller';
import { AttrGroupService } from './attr-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttrGroupEntity } from './entities/attr-group.entity';
import { DB_CONNECTION } from '@libs/constant';

@Module({
  imports: [TypeOrmModule.forFeature([AttrGroupEntity], DB_CONNECTION)],
  controllers: [AttrGroupController],
  providers: [AttrGroupService],
})
export class AttrGroupModule {}
