import { generateUUIDv4 } from '@libs/uuid';
import { UserEntity } from '../src/user.entity';

export const createMockUser = (
  overrides: Partial<UserEntity> = {},
): UserEntity => {
  const id = generateUUIDv4();

  return {
    id,
    username: 'admin',
    ...overrides,
  } as UserEntity;
};

export const mockUserRepository = {
  save: jest.fn(),
  findOneOrFail: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
};
