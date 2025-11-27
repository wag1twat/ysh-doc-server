import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CREDENTIAL_DB_CONNTECTION } from 'libs/constant';
import { CredentialService } from './credential.service';
import { CredentialEntity } from './credential.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CredentialEntity], CREDENTIAL_DB_CONNTECTION),
  ],
  controllers: [],
  providers: [CredentialService],
})
export class CredentialModule {}
