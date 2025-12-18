import { Module } from '@nestjs/common';
import { DocController } from './doc.controller';
import { DocService } from './doc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocEntity } from './doc.entity';
import { DB_CONNECTION } from '@libs/constant';

@Module({
  imports: [TypeOrmModule.forFeature([DocEntity], DB_CONNECTION)],
  controllers: [DocController],
  providers: [DocService],
})
export class DocModule {}
