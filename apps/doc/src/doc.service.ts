import { HttpStatus, Injectable } from '@nestjs/common';
import { DocFindAllDto, DocFindOneDto } from './doc.dto';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { DocEntity } from './doc.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_CONNECTION } from '@libs/constant';
import { RpcQueryCatch } from '@libs/rpc.query-catch.decorator';
import { atLeastOne } from '@libs/atLeastOne';
import { ErrorFactory } from '@libs/error.factory';

@Injectable()
export class DocService {
  constructor(
    @InjectRepository(DocEntity, DB_CONNECTION)
    private readonly repo: Repository<DocEntity>,
  ) {
    console.log('DocService initialized');
  }

  @RpcQueryCatch()
  findOne(dto: DocFindOneDto) {
    if (!atLeastOne(dto, ['id', 'name'])) {
      throw ErrorFactory.rpc(
        HttpStatus.BAD_REQUEST,
        ErrorFactory.messages.EMPTY_BODY,
      );
    }

    const { name, id } = dto;

    return this.repo.findOneOrFail({
      where: { id, name },
    });
  }

  @RpcQueryCatch()
  findAll(dto: DocFindAllDto) {
    const { ids } = dto;

    const where: FindOptionsWhere<DocEntity> = {};

    if (ids && ids.length) {
      where.id = In(ids);
    }

    return this.repo.find({ where });
  }
}
