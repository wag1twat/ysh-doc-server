import { ApiPropertyOptions } from '@nestjs/swagger';

interface UserSwagger {
  tag: string;
  id: ApiPropertyOptions;
  ids: ApiPropertyOptions;
  username: ApiPropertyOptions;
  credential: ApiPropertyOptions;
}

export const userSwagger: UserSwagger = {
  tag: 'users',
  id: {
    description: 'Идентификатор пользователя в фомарте uuidv4',
    example: 'c76abba6-7717-4dcd-b620-b026b9b1b8ad',
  },
  ids: {
    description: 'Идентификаторы пользователей в фомарте uuidv4',
    example: ['c76abba6-7717-4dcd-b620-b026b9b1b8ad'],
  },
  username: {
    description: 'Имя пользователя',
    example: 'admin',
  },
  credential: { description: '$', example: '$' },
};
