import { Injectable } from '@nestjs/common';
import {
  AttrGroupCreateOneDto,
  AttrGroupDeleteOneDto,
  AttrGroupFindAllDto,
  AttrGroupFindOneDto,
} from './attr-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_CONNECTION } from '@libs/constant';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { RpcQueryCatch } from '@libs/rpc.query-catch.decorator';
import { AttrGroupEntity } from './entities/attr-group.entity';

@Injectable()
export class AttrGroupService {
  constructor(
    @InjectRepository(AttrGroupEntity, DB_CONNECTION)
    private readonly repo: Repository<AttrGroupEntity>,
  ) {
    console.log('AttrGroupService initialized');
  }
  @RpcQueryCatch()
  public createOne(dto: AttrGroupCreateOneDto) {
    const { name, attributes } = dto;

    const attrGroup = this.repo.create({
      name,
      attributes: attributes.map((id) => ({ id })),
    });

    return this.repo.save(attrGroup);
  }

  @RpcQueryCatch()
  public findOne(dto: AttrGroupFindOneDto) {
    const { id, name } = dto;

    return this.repo.findOneOrFail({
      where: { id, name },
    });
  }

  @RpcQueryCatch()
  public deleteOne(dto: AttrGroupDeleteOneDto) {
    const { id } = dto;

    return this.repo.delete({ id });
  }

  @RpcQueryCatch()
  public findAll(dto: AttrGroupFindAllDto) {
    const { ids } = dto;

    const where: FindOptionsWhere<AttrGroupEntity> = {};

    if (ids && ids.length) {
      where.id = In(ids);
    }

    return this.repo.find({ where, relations: ['attributes'] });
  }
}
