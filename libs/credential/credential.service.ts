import { Injectable } from '@nestjs/common';
import { CreateCredentialOneDto, CredentialFindOneDto } from './credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DB_CONNECTION } from '@libs/constant';
import { RpcQueryCatch } from '@libs/rpc.query-catch.decorator';
import { CredentialEntity } from './credential.entity';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(CredentialEntity, DB_CONNECTION)
    private readonly repo: Repository<CredentialEntity>,
  ) {
    console.log('CredentialService initialized');
  }

  @RpcQueryCatch()
  public createOne(dto: CreateCredentialOneDto) {
    return this.repo.save(dto);
  }

  @RpcQueryCatch()
  public findOne(dto: CredentialFindOneDto) {
    const { user } = dto;

    return this.repo.findOne({
      relations: ['user'],
      where: { user: { id: user } },
    });
  }
}
