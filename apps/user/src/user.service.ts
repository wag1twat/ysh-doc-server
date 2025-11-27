import { Injectable } from '@nestjs/common';
import {
  CreateUserOneDto,
  DeleteUserOneDto,
  UserFindAllDto,
  UserFindOneDto,
} from './user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DB_CONNECTION } from '@libs/constant';
import { RpcQueryCatch } from '@libs/rpc.query-catch.decorator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, DB_CONNECTION)
    private readonly repo: Repository<UserEntity>,
  ) {
    console.log('UserService initialized');
  }

  @RpcQueryCatch()
  public createOne(dto: CreateUserOneDto) {
    return this.repo.save(dto);
  }

  @RpcQueryCatch()
  public findOne(dto: UserFindOneDto) {
    const { username } = dto;

    return this.repo.findOne({
      where: { username },
    });
  }

  @RpcQueryCatch()
  public deleteOne(dto: DeleteUserOneDto) {
    const { id } = dto;

    return this.repo.delete({ id });
  }

  @RpcQueryCatch()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async findAll(dto: UserFindAllDto) {
    return this.repo.find();
  }
}
