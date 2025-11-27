import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { connectionSource } from '../db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ATTR_SERVICE,
  AUTH_SERVICE,
  DB_CONNECTION,
  DOC_SERVICE,
  USER_SERVICE,
} from '@libs/constant';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from '@apps/user/src/user.module';
import { AuthModule } from '@apps/auth/src/auth.module';
import { AttrModule } from '@apps/attr/src/attr.module';
import { DocModule } from '@apps/doc/src/doc.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [connectionSource],
    }),
    TypeOrmModule.forRootAsync({
      name: DB_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get(DB_CONNECTION)!,
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
