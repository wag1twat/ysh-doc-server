import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthSignInDto, AuthSignUpDto } from './auth.dto';
import { AuthMessage } from './auth.message';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AuthMessage.signUp)
  signUp(@Payload() dto: AuthSignUpDto) {
    return this.authService.signUp(dto);
  }

  @MessagePattern(AuthMessage.signIn)
  signIn(@Payload() dto: AuthSignInDto) {
    return this.authService.signIn(dto);
  }
}
