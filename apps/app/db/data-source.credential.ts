import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';
import { CredentialEntity } from '../../../libs/credential/credential.entity';
import { CREDENTIAL_DB_CONNTECTION } from 'libs/constant';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  name: CREDENTIAL_DB_CONNTECTION,
  type: 'postgres',
  host: process.env.CREDENTIAL_DB_HOST,
  port: +process.env.CREDENTIAL_DB_PORT!,
  username: process.env.CREDENTIAL_DB_USER,
  password: process.env.CREDENTIAL_DB_PASS,
  database: process.env.CREDENTIAL_DB_NAME,
  entities: [CredentialEntity],
  migrations: [path.join(__dirname, 'apps/app/db/migrations/auth/*.ts')],
  synchronize: false,
};

export const connectionCredentialSource = registerAs(
  CREDENTIAL_DB_CONNTECTION,
  () => config,
);

export default new DataSource(config);
