import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from 'apps/user/src/user.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'apps/user/src/user.entity';
import { DB_CONNECTION } from 'libs/constant';
import { CredentialEntity } from 'libs/credential/credential.entity';
import { CredentialService } from 'libs/credential/credential.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([UserEntity, CredentialEntity], DB_CONNECTION),
  ],
  providers: [AuthService, UserService, CredentialService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
