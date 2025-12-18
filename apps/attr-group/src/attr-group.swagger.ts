import { ApiPropertyOptions } from '@nestjs/swagger';

interface AttrGroupSwagger {
  tag: string;
  id: ApiPropertyOptions;
  ids: ApiPropertyOptions;
  name: ApiPropertyOptions;
  attributes: ApiPropertyOptions;
}

export const attrGroupSwagger: AttrGroupSwagger = {
  tag: 'attrs-groups',
  id: {
    description: 'Идентификатор группы атрибутов в фомарте uuidv4',
    example: 'c76abba6-7717-4dcd-b620-b026b9b1b8ad',
  },
  ids: {
    description: 'Идентификаторы групп атрибутов в фомарте uuidv4',
    example: ['c76abba6-7717-4dcd-b620-b026b9b1b8ad'],
  },
  attributes: {
    description:
      'Идентификаторы атрибутов включенных в группу в фомарте uuidv4',
    example: ['c76abba6-7717-4dcd-b620-b026b9b1b8ad'],
  },
  name: {
    description: 'Наименование группы атрибута',
    example: 'Группа атрибутов №1',
    maxLength: 100,
  },
};
