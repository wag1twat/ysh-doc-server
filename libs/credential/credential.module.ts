import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONNECTION } from '@libs/constant';
import { CredentialService } from './credential.service';
import { CredentialEntity } from './credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CredentialEntity], DB_CONNECTION)],
  controllers: [],
  providers: [CredentialService],
})
export class CredentialModule {}
