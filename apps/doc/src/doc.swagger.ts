import { ApiPropertyOptions } from '@nestjs/swagger';

interface DocSwagger {
  tag: string;
  id: ApiPropertyOptions;
  ids: ApiPropertyOptions;
  name: ApiPropertyOptions;
}

export const docSwagger: DocSwagger = {
  tag: 'docs',
  id: {
    description: 'Идентификатор документа в фомарте uuidv4',
    example: 'c76abba6-7717-4dcd-b620-b026b9b1b8ad',
  },
  ids: {
    description: 'Идентификаторы документов в фомарте uuidv4',
    example: ['c76abba6-7717-4dcd-b620-b026b9b1b8ad'],
  },
  name: {
    description: 'Наименование документа',
    example: 'Документ №1',
    maxLength: 100,
  },
};
