import { Injectable } from '@nestjs/common';
import {
  CreateOneAttrDTO,
  DeleteOneAttrDTO,
  FindAllAttrDTO,
  FindOneAttrDTO,
} from './attr.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AttrEntity } from './entities/attr.entity';
import { DB_CONNECTION } from '@libs/constant';
import { Repository } from 'typeorm';
import { RpcQueryCatch } from '@libs/rpc.query-catch.decorator';
import { AttrGroupEntity } from '@apps/attr-group/src/entities/attr-group.entity';

@Injectable()
export class AttrService {
  constructor(
    @InjectRepository(AttrEntity, DB_CONNECTION)
    private readonly repo: Repository<AttrEntity>,
    @InjectRepository(AttrGroupEntity, DB_CONNECTION)
    private readonly repoGroup: Repository<AttrGroupEntity>,
  ) {
    console.log('AttrService initialized');
  }
  @RpcQueryCatch()
  public createOne(dto: CreateOneAttrDTO) {
    return this.repo.save(dto);
  }

  @RpcQueryCatch()
  public findOne(dto: FindOneAttrDTO) {
    const { id, name } = dto;

    return this.repo.findOneOrFail({ where: { id, name } });
  }

  @RpcQueryCatch()
  public async deleteOne(dto: DeleteOneAttrDTO) {
    const { id } = dto;

    let groups = await this.repoGroup.find({
      relations: ['attributes'],
      where: { attributes: { id } },
    });

    groups = groups.map((group) => {
      group.attributes = group.attributes.filter(
        (attribute) => attribute.id !== id,
      );
      return { ...group };
    });

    await this.repoGroup.save(groups);

    return this.repo.delete({ id });
  }

  @RpcQueryCatch()
  public findAll(dto: FindAllAttrDTO) {
    return this.repo.find({ relations: ['groups'] });
  }
}
