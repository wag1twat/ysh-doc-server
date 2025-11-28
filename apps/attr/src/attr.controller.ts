import { Controller } from '@nestjs/common';
import { AttrService } from './attr.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttrMessage } from './attr.message';
import {
  AttrCreateOneDto,
  AttrDeleteOneDto,
  AttrFindAllDto,
  AttrFindOneDto,
} from './attr.dto';

@Controller()
export class AttrController {
  constructor(private readonly attrService: AttrService) {
    console.log('AttrController initialized');
  }

  @MessagePattern(AttrMessage.createOne)
  createOne(@Payload() dto: AttrCreateOneDto) {
    return this.attrService.createOne(dto);
  }

  @MessagePattern(AttrMessage.findOne)
  findOne(@Payload() dto: AttrFindOneDto) {
    return this.attrService.findOne(dto);
  }

  @MessagePattern(AttrMessage.deleteOne)
  deleteOne(@Payload() dto: AttrDeleteOneDto) {
    return this.attrService.deleteOne(dto);
  }

  @MessagePattern(AttrMessage.findAll)
  findAll(@Payload() dto: AttrFindAllDto) {
    return this.attrService.findAll(dto);
  }
}
