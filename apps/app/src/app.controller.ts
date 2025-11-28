import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthSignInDto, AuthSignUpDto } from '@apps/auth/src/auth.dto';
import {
  DeleteUserOneDto,
  UserFindAllDto,
  UserFindOneDto,
} from '@apps/user/src/user.dto';
import {
  AttrCreateOneDto,
  AttrDeleteOneDto,
  AttrFindAllDto,
  AttrFindOneDto,
} from '@apps/attr/src/attr.dto';
import { DocFindAllDto, DocFindOneDto } from '@apps/doc/src/doc.dto';
import {
  AttrGroupCreateOneDto,
  AttrGroupDeleteOneDto,
  AttrGroupFindAllDto,
  AttrGroupFindOneDto,
} from '@apps/attr-group/src/attr-group.dto';

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

  /* USERS */
  // @UseGuards(AuthGuard)
  @Get('user')
  getUser(@Body() dto: UserFindOneDto) {
    return this.appService.getUser(dto);
  }

  @Delete('user')
  deleteUser(@Body() dto: DeleteUserOneDto) {
    return this.appService.deleteUser(dto);
  }

  // @UseGuards(AuthGuard)
  @Get('users')
  getUsers(@Body() dto: UserFindAllDto) {
    return this.appService.getUsers(dto);
  }

  /* ATTRS */
  // @UseGuards(AuthGuard)
  @Post('attr')
  createAttr(@Body() dto: AttrCreateOneDto) {
    return this.appService.createAttr(dto);
  }

  // @UseGuards(AuthGuard)
  @Get('attr')
  getAttr(@Body() dto: AttrFindOneDto) {
    return this.appService.getAttr(dto);
  }

  // @UseGuards(AuthGuard)
  @Delete('attr')
  deleteAttr(@Body() dto: AttrDeleteOneDto) {
    return this.appService.deleteAttr(dto);
  }

  // @UseGuards(AuthGuard)
  @Get('attrs')
  getAttrs(@Body() dto: AttrFindAllDto) {
    return this.appService.getAttrs(dto);
  }

  /* ATTRS GROUPS */
  // @UseGuards(AuthGuard)
  @Post('attr/group')
  createAttrGroup(@Body() dto: AttrGroupCreateOneDto) {
    return this.appService.createAttrGroup(dto);
  }

  // @UseGuards(AuthGuard)
  @Get('attr/group')
  getAttrGroup(@Body() dto: AttrGroupFindOneDto) {
    return this.appService.getAttrGroup(dto);
  }

  // @UseGuards(AuthGuard)
  @Delete('attr/group')
  deleteAttrGroup(@Body() dto: AttrGroupDeleteOneDto) {
    return this.appService.deleteAttrGroup(dto);
  }

  // @UseGuards(AuthGuard)
  @Get('attrs/groups')
  getAttrsGroup(@Body() dto: AttrGroupFindAllDto) {
    return this.appService.getAttrsGroup(dto);
  }

  /* DOCS */
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
