import { Injectable } from '@nestjs/common';
import { AttrFindAllDto, AttrFindOneDto } from './attr.dto';

@Injectable()
export class AttrService {
  constructor() {
    console.log('AttrService initialized');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(dto: AttrFindOneDto) {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(dto: AttrFindAllDto) {
    return [];
  }
}
