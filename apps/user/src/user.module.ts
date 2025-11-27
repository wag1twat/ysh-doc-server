import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { USER_DB_CONNECTION } from 'libs/constant';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity], USER_DB_CONNECTION)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
