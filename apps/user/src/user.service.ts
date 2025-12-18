import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateOneUserDTO,
  DeleteOneUserDTO,
  FindAllUserDTO,
  FindOneUserDTO,
  UserDTO,
} from './user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { DB_CONNECTION } from '@libs/constant';
import { RpcQueryCatch } from '@libs/rpc.query-catch.decorator';
import { atLeastOne } from '@libs/atLeastOne';
import { ErrorFactory } from '@libs/error.factory';
import { DeleteEntityResponseDTO } from '@libs/base.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, DB_CONNECTION)
    private readonly repo: Repository<UserEntity>,
  ) {
    console.log('UserService initialized');
  }

  @RpcQueryCatch()
  public async createOne(dto: CreateOneUserDTO): Promise<UserDTO> {
    let user = this.repo.create(dto);

    user = await this.repo.save(user);

    return await this.findOne({ id: user.id });
  }

  @RpcQueryCatch()
  public findOne(dto: FindOneUserDTO): Promise<UserDTO> {
    if (!atLeastOne(dto, ['id', 'username'])) {
      throw ErrorFactory.rpc(
        HttpStatus.BAD_REQUEST,
        ErrorFactory.messages.EMPTY_BODY,
      );
    }

    const { username, id } = dto;

    return this.repo.findOneOrFail({
      where: { id, username },
      select: ['id', 'username'],
    });
  }

  @RpcQueryCatch()
  public deleteOne(dto: DeleteOneUserDTO): Promise<DeleteEntityResponseDTO> {
    const { id } = dto;

    return this.repo.delete({ id });
  }

  @RpcQueryCatch()
  public findAll(dto: FindAllUserDTO): Promise<UserDTO[]> {
    const { ids } = dto;

    const where: FindOptionsWhere<UserEntity> = {};

    if (ids && ids.length) {
      where.id = In(ids);
    }

    return this.repo.find({ where, select: ['id', 'username'] });
  }
}
