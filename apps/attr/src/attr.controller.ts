import { Controller } from '@nestjs/common';
import { AttrService } from './attr.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttrMessage } from './attr.message';
import { AttrFindAllDto, AttrFindOneDto } from './attr.dto';

@Controller()
export class AttrController {
  constructor(private readonly attrService: AttrService) {
    console.log('AttrController initialized');
  }

  @MessagePattern(AttrMessage.findOne)
  findOne(@Payload() dto: AttrFindOneDto) {
    return this.attrService.findOne(dto);
  }

  @MessagePattern(AttrMessage.findAll)
  findAll(@Payload() dto: AttrFindAllDto) {
    return this.attrService.findAll(dto);
  }
}
