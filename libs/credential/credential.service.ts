import { Injectable } from '@nestjs/common';
import { CreateCredentialOneDto, CredentialFindOneDto } from './credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CREDENTIAL_DB_CONNTECTION } from 'libs/constant';
import { RpcQueryCatch } from 'libs/rpc.query-catch.decorator';
import { CredentialEntity } from './credential.entity';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(CredentialEntity, CREDENTIAL_DB_CONNTECTION)
    private readonly repo: Repository<CredentialEntity>,
  ) {
    console.log('CredentialService initialized');
  }

  @RpcQueryCatch()
  public createOne(dto: CreateCredentialOneDto) {
    return this.repo.insert(dto);
  }

  @RpcQueryCatch()
  public findOne(dto: CredentialFindOneDto) {
    const { id } = dto;

    return this.repo.findOne({ where: { id } });
  }
}
