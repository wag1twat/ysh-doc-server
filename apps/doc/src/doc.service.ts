import { Injectable } from '@nestjs/common';
import { DocFindAllDto, DocFindOneDto } from './doc.dto';

@Injectable()
export class DocService {
  constructor() {
    console.log('DocService initialized');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(dto: DocFindOneDto) {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(dto: DocFindAllDto) {
    return [];
  }
}
