import { ApiPropertyOptions } from '@nestjs/swagger';

interface AttrSwagger {
  tag: string;
  id: ApiPropertyOptions;
  ids: ApiPropertyOptions;
  name: ApiPropertyOptions;
}

export const attrSwagger: AttrSwagger = {
  tag: 'attrs',
  id: {
    description: 'Идентификатор атрибута в фомарте uuidv4',
    example: 'c76abba6-7717-4dcd-b620-b026b9b1b8ad',
  },
  ids: {
    description: 'Идентификаторы атрибутов в фомарте uuidv4',
    example: ['c76abba6-7717-4dcd-b620-b026b9b1b8ad'],
  },
  name: {
    description: 'Наименование атрибута',
    example: 'Атрибут №1',
    maxLength: 100,
  },
};
