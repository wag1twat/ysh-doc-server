import { Controller } from '@nestjs/common';
import { DocService } from './doc.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DocMessage } from './doc.message';
import { DocFindAllDto, DocFindOneDto } from './doc.dto';

@Controller()
export class DocController {
  constructor(private readonly docService: DocService) {
    console.log('DocController initialized');
  }

  @MessagePattern(DocMessage.findOne)
  findOne(@Payload() dto: DocFindOneDto) {
    return this.docService.findOne(dto);
  }

  @MessagePattern(DocMessage.findAll)
  findAll(@Payload() dto: DocFindAllDto) {
    return this.docService.findAll(dto);
  }
}
