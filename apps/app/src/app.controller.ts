import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserFindAllDto, UserFindOneDto } from 'apps/user/src/user.dto';
import { AuthSignInDto, AuthSignUpDto } from 'apps/auth/src/auth.dto';
import { DocFindAllDto, DocFindOneDto } from 'apps/doc/src/doc.dto';
import { AttrFindAllDto, AttrFindOneDto } from 'apps/attr/src/attr.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  singUp(@Body() dto: AuthSignUpDto) {
    return this.appService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  singIn(@Body() dto: AuthSignInDto) {
    return this.appService.signIn(dto);
  }

  // @UseGuards(AuthGuard)
  @Get('user')
  getUser(@Body() dto: UserFindOneDto) {
    return this.appService.getUser(dto);
  }

  // @UseGuards(AuthGuard)
  @Get('users')
  getUsers(@Body() dto: UserFindAllDto) {
    return this.appService.getUsers(dto);
  }

  // @UseGuards(AuthGuard)
  @Get('attr')
  getAttr(@Body() dto: AttrFindOneDto) {
    return this.appService.getAttr(dto);
  }

  // @UseGuards(AuthGuard)
  @Get('attrs')
  getAttrs(@Body() dto: AttrFindAllDto) {
    return this.appService.getAttrs(dto);
  }

  // @UseGuards(AuthGuard)
  @Get('doc')
  getDoc(@Body() dto: DocFindOneDto) {
    return this.appService.getDoc(dto);
  }

  // @UseGuards(AuthGuard)
  @Get('docs')
  getDocs(@Body() dto: DocFindAllDto) {
    return this.appService.getDocs(dto);
  }
}
