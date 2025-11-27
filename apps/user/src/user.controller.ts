import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMessage } from './user.message';
import { CreateUserOneDto, UserFindAllDto, UserFindOneDto } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
    console.log('UserController initialized');
  }

  @MessagePattern(UserMessage.createOne)
  createOne(@Payload() dto: CreateUserOneDto) {
    return this.userService.createOne(dto);
  }

  @MessagePattern(UserMessage.findOne)
  findOne(@Payload() dto: UserFindOneDto) {
    return this.userService.findOne(dto);
  }

  @MessagePattern(UserMessage.findAll)
  findAll(@Payload() dto: UserFindAllDto) {
    return this.userService.findAll(dto);
  }
}
