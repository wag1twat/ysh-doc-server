import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserOneDto,
  DeleteUserOneDto,
  UserFindAllDto,
  UserFindOneDto,
} from './user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { DB_CONNECTION } from '@libs/constant';
import { RpcQueryCatch } from '@libs/rpc.query-catch.decorator';
import { atLeastOne } from '@libs/atLeastOne';
import { ErrorFactory } from '@libs/error.factory';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, DB_CONNECTION)
    private readonly repo: Repository<UserEntity>,
  ) {
    console.log('UserService initialized');
  }

  @RpcQueryCatch()
  public async createOne(dto: CreateUserOneDto) {
    const user = this.repo.create(dto);
    return await this.repo.save(user);
  }

  @RpcQueryCatch()
  public findOne(dto: UserFindOneDto) {
    if (!atLeastOne(dto, ['id', 'username'])) {
      throw ErrorFactory.rpc(
        HttpStatus.BAD_REQUEST,
        ErrorFactory.messages.EMPTY_BODY,
      );
    }

    const { username, id } = dto;

    return this.repo.findOneOrFail({
      where: { id, username },
    });
  }

  @RpcQueryCatch()
  public deleteOne(dto: DeleteUserOneDto) {
    const { id } = dto;

    return this.repo.delete({ id });
  }

  @RpcQueryCatch()
  public findAll(dto: UserFindAllDto) {
    const { ids } = dto;

    const where: FindOptionsWhere<UserEntity> = {};

    if (ids && ids.length) {
      where.id = In(ids);
    }

    return this.repo.find({ where });
  }
}
