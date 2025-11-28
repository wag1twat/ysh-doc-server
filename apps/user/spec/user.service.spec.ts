import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../src/user.service';
import { UserEntity } from '../src/user.entity';
import {
  CreateUserOneDto,
  DeleteUserOneDto,
  UserFindOneDto,
} from '../src/user.dto';
import { DB_CONNECTION } from '@libs/constant';
import { CredentialEntity } from '@libs/credential/credential.entity';
import { UserController } from '../src/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { connectionSource } from '@apps/app/db/data-source';
import { INestApplication } from '@nestjs/common';

describe('UserService', () => {
  let app: INestApplication;
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        TypeOrmModule.forFeature([UserEntity, CredentialEntity], DB_CONNECTION),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    app = module.createNestApplication();

    await app.init();

    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOne', () => {
    it('should create a user successfully', async () => {
      const username = 'admin' + Math.random();

      const createDto: CreateUserOneDto = {
        username,
      };

      const result = await service.createOne(createDto);

      expect(result).toEqual(
        expect.objectContaining({ username: createDto.username }),
      );

      const { affected } = await service.deleteOne({ id: result.id });

      expect(affected).toBe(1);
    });

    it('should handle create user error unique username', async () => {
      const username = 'admin' + Math.random();

      const createDto: CreateUserOneDto = {
        username,
      };

      const result = await service.createOne(createDto);

      const failure = service.createOne(createDto);

      await expect(failure).rejects.toThrow(
        `Key (username)=(${createDto.username}) already exists.`,
      );

      const { affected } = await service.deleteOne({ id: result.id });

      expect(affected).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should find user by id', async () => {
      const username = 'admin' + Math.random();

      const createUserDto: CreateUserOneDto = { username };

      const user = await service.createOne(createUserDto);

      const findDto: UserFindOneDto = { id: user.id };

      const result = await service.findOne(findDto);

      expect(result).toEqual(expect.objectContaining({ id: user.id }));

      const { affected } = await service.deleteOne({ id: user.id });

      expect(affected).toBe(1);
    });

    it('should find user by username', async () => {
      const username = 'admin' + Math.random();

      const createUserDto: CreateUserOneDto = { username };

      const user = await service.createOne(createUserDto);

      const findDto: UserFindOneDto = { username: user.username };

      const result = await service.findOne(findDto);

      expect(result).toEqual(
        expect.objectContaining({ username: user.username }),
      );

      const { affected } = await service.deleteOne({ id: user.id });

      expect(affected).toBe(1);
    });

    it('should find user by both id and username', async () => {
      const username = 'admin' + Math.random();

      const createUserDto: CreateUserOneDto = { username };

      const user = await service.createOne(createUserDto);

      const findDto: UserFindOneDto = { username: user.username };

      const result = await service.findOne(findDto);

      expect(result).toEqual(
        expect.objectContaining({
          id: user.id,
          username: user.username,
        }),
      );

      const { affected } = await service.deleteOne({ id: user.id });

      expect(affected).toBe(1);
    });

    it('should handle user not found error', async () => {
      const findDto: UserFindOneDto = { id: '999' };

      await expect(service.findOne(findDto)).rejects.toThrow();
    });
  });

  describe('deleteOne', () => {
    it('should delete user successfully', async () => {
      const username = 'admin' + Math.random();

      const createUserDto: CreateUserOneDto = { username };

      const user = await service.createOne(createUserDto);

      const deleteDto: DeleteUserOneDto = { id: user.id };

      const { affected } = await service.deleteOne(deleteDto);

      expect(affected).toBe(1);
    });

    it('should handle delete user error', async () => {
      const deleteDto: DeleteUserOneDto = { id: '1' };

      await expect(service.deleteOne(deleteDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const createUserDto: CreateUserOneDto[] = [
        { username: 'admin' + Math.random() },
        { username: 'admin' + Math.random() },
        { username: 'admin' + Math.random() },
        { username: 'admin' + Math.random() },
        { username: 'admin' + Math.random() },
      ];

      const users = await Promise.all(
        createUserDto.map((dto) => service.createOne(dto)),
      );

      const result = await service.findAll({
        ids: users.map((user) => user.id),
      });

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ username: createUserDto[0].username }),
          expect.objectContaining({ username: createUserDto[1].username }),
          expect.objectContaining({ username: createUserDto[2].username }),
          expect.objectContaining({ username: createUserDto[3].username }),
          expect.objectContaining({ username: createUserDto[4].username }),
        ]),
      );

      await Promise.all(
        users.map((user) => service.deleteOne({ id: user.id })),
      );
    });

    it('should handle empty users list', async () => {
      const result = await service.findAll({});

      expect(result).toEqual([]);
    });

    it('should handle find all error', async () => {
      await expect(
        service.findAll({
          ids: ['999'],
        }),
      ).rejects.toThrow();
    });
  });
});
