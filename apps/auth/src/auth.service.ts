import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@apps/user/src/user.service';
import { AuthSignInDto, AuthSignUpDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@apps/user/src/user.entity';
import { RpcQueryCatch } from '@libs/rpc.query-catch.decorator';
import { CredentialService } from '@libs/credential/credential.service';
import { ErrorFactory } from '@libs/error.factory';

@Injectable()
export class AuthService {
  constructor(
    private credentialService: CredentialService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @RpcQueryCatch()
  async signUp(dto: AuthSignUpDto) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(dto.password, salt);

    const user = await this.userService.createOne({ username: dto.username });

    await this.credentialService.createOne({
      hash,
      user,
    });

    return user;
  }

  @RpcQueryCatch()
  async signIn(dto: AuthSignInDto): Promise<{ access_token: string }> {
    const { username } = dto;

    let user = await this.userService.findOne({ username });

    if (!user) {
      throw ErrorFactory.rpc(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    user = await this.verifyAsync(dto, user);

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }

  private async verifyAsync(dto: AuthSignInDto, user: UserEntity) {
    const credentials = await this.credentialService.findOne({ user: user.id });

    if (!credentials) {
      throw ErrorFactory.rpc(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    const match = await bcrypt.compare(dto.password, credentials.hash);

    if (!match) {
      throw ErrorFactory.rpc(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    return user;
  }
}
