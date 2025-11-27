import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ATTR_SERVICE,
  AUTH_SERVICE,
  CREDENTIAL_DB_CONNTECTION,
  DOC_SERVICE,
  USER_DB_CONNECTION,
  USER_SERVICE,
} from 'libs/constant';
import { UserModule } from 'apps/user/src/user.module';
import { DocModule } from 'apps/doc/src/doc.module';
import { AttrModule } from 'apps/attr/src/attr.module';
import { AuthModule } from 'apps/auth/src/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionUserSource } from '../db/data-source.user';
import { connectionCredentialSource } from '../db/data-source.credential';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [connectionUserSource, connectionCredentialSource],
    }),
    TypeOrmModule.forRootAsync({
      name: USER_DB_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get(USER_DB_CONNECTION)!,
    }),
    TypeOrmModule.forRootAsync({
      name: CREDENTIAL_DB_CONNTECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get(CREDENTIAL_DB_CONNTECTION)!,
    }),
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3001 },
      },
      {
        name: DOC_SERVICE,
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
      {
        name: ATTR_SERVICE,
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3003 },
      },
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3004 },
      },
    ]),
    UserModule,
    AuthModule,
    AttrModule,
    DocModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
