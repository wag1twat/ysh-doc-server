import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMessage } from './user.message';
import {
  CreateOneUserDTO,
  DeleteOneUserDTO,
  FindAllUserDTO,
  FindOneUserDTO,
} from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
    console.log('UserController initialized');
  }

  @MessagePattern(UserMessage.createOne)
  createOne(@Payload() dto: CreateOneUserDTO) {
    return this.userService.createOne(dto);
  }

  @MessagePattern(UserMessage.findOne)
  findOne(@Payload() dto: FindOneUserDTO) {
    return this.userService.findOne(dto);
  }

  @MessagePattern(UserMessage.deleteOne)
  deleteOne(@Payload() dto: DeleteOneUserDTO) {
    return this.userService.deleteOne(dto);
  }

  @MessagePattern(UserMessage.findAll)
  findAll(@Payload() dto: FindAllUserDTO) {
    return this.userService.findAll(dto);
  }
}
