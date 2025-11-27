import { IsString } from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class AuthSignInDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
