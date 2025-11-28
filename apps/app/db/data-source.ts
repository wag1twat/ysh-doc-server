import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';
import { registerAs } from '@nestjs/config';
import { DB_CONNECTION } from '@libs/constant';
import { UserEntity } from '@apps/user/src/user.entity';
import { CredentialEntity } from '@libs/credential/credential.entity';
import { AttrEntity } from '@apps/attr/src/entities/attr.entity';
import { AttrGroupEntity } from '@apps/attr-group/src/entities/attr-group.entity';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  name: DB_CONNECTION,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [UserEntity, CredentialEntity, AttrEntity, AttrGroupEntity],
  migrations: [path.join(__dirname, '/migrations/*.ts')],
  synchronize: false,
};

export const connectionSource = registerAs(DB_CONNECTION, () => config);

export default new DataSource(config);
