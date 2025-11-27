import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DB_CONNECTION } from '@libs/constant';
import { CredentialEntity } from '@libs/credential/credential.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CredentialEntity], DB_CONNECTION),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
