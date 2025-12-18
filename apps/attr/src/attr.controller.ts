import { Controller } from '@nestjs/common';
import { AttrService } from './attr.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttrMessage } from './attr.message';
import {
  CreateOneAttrDTO,
  DeleteOneAttrDTO,
  FindAllAttrDTO,
  FindOneAttrDTO,
} from './attr.dto';

@Controller()
export class AttrController {
  constructor(private readonly attrService: AttrService) {
    console.log('AttrController initialized');
  }

  @MessagePattern(AttrMessage.createOne)
  public createOne(@Payload() dto: CreateOneAttrDTO) {
    return this.attrService.createOne(dto);
  }

  @MessagePattern(AttrMessage.findOne)
  public findOne(@Payload() dto: FindOneAttrDTO) {
    return this.attrService.findOne(dto);
  }

  @MessagePattern(AttrMessage.deleteOne)
  public deleteOne(@Payload() dto: DeleteOneAttrDTO) {
    return this.attrService.deleteOne(dto);
  }

  @MessagePattern(AttrMessage.findAll)
  public findAll(@Payload() dto: FindAllAttrDTO) {
    return this.attrService.findAll(dto);
  }
}
