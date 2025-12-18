import { ApiPropertyOptions } from '@nestjs/swagger';

interface AuthSwagger {
  tag: string;
  username: ApiPropertyOptions;
  password: ApiPropertyOptions;
  access_token: ApiPropertyOptions;
}

export const authSwagger: AuthSwagger = {
  tag: 'auth',
  username: { description: 'Имя пользователя', example: 'admin' },
  password: {
    description: 'Пароль',
    example: 'admin',
  },
  access_token: {
    description: 'Токен авторизации',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMTc5MTVmZS03ZmJmLTQwOTAtYWJkMS1jNTFkYzk3NWE1ODkiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzY0MzMxODMzLCJleHAiOjE3NjQzMzE4OTN9.IAbeZCrVDBjeMT8Wujj2ckl4G3gsPuYxHfTGK-8z0KA',
  },
};
