import { registerAs } from '@nestjs/config';
import { USER_DB_CONNECTION } from '../../../libs/constant';
import { UserEntity } from '../../user/src/user.entity';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  name: USER_DB_CONNECTION,
  type: 'postgres',
  host: process.env.USER_DB_HOST,
  port: +process.env.USER_DB_PORT!,
  username: process.env.USER_DB_USER,
  password: process.env.USER_DB_PASS,
  database: process.env.USER_DB_NAME,
  entities: [UserEntity],
  migrations: [path.join(__dirname, 'apps/app/db/migrations/user/*.ts')],
  synchronize: false,
};

export const connectionUserSource = registerAs(
  USER_DB_CONNECTION,
  () => config,
);

export default new DataSource(config);
