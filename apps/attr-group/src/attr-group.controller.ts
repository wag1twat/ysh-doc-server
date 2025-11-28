import { Controller } from '@nestjs/common';
import { AttrGroupService } from './attr-group.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttrGroupMessage } from './attr-group.message';
import {
  AttrGroupCreateOneDto,
  AttrGroupDeleteOneDto,
  AttrGroupFindAllDto,
  AttrGroupFindOneDto,
} from './attr-group.dto';

@Controller()
export class AttrGroupController {
  constructor(private readonly attrGroupService: AttrGroupService) {
    console.log('AttrGroupController initialized');
  }

  @MessagePattern(AttrGroupMessage.createOne)
  createOne(@Payload() dto: AttrGroupCreateOneDto) {
    return this.attrGroupService.createOne(dto);
  }

  @MessagePattern(AttrGroupMessage.findOne)
  findOne(@Payload() dto: AttrGroupFindOneDto) {
    return this.attrGroupService.findOne(dto);
  }

  @MessagePattern(AttrGroupMessage.deleteOne)
  deleteOne(@Payload() dto: AttrGroupDeleteOneDto) {
    return this.attrGroupService.deleteOne(dto);
  }

  @MessagePattern(AttrGroupMessage.findAll)
  findAll(@Payload() dto: AttrGroupFindAllDto) {
    return this.attrGroupService.findAll(dto);
  }
}
