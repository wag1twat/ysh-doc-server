import { Module } from '@nestjs/common';
import { AttrController } from './attr.controller';
import { AttrService } from './attr.service';

@Module({
  imports: [],
  controllers: [AttrController],
  providers: [AttrService],
})
export class AttrModule {}
