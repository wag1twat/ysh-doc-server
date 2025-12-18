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
  DeleteOneUserDTO,
  FindAllUserDTO,
  FindOneUserDTO,
} from '@apps/user/src/user.dto';
import {
  CreateOneAttrDTO,
  DeleteOneAttrDTO,
  FindAllAttrDTO,
  FindOneAttrDTO,
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

  @AuthSignUpDto.buildSwagger()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  singUp(@Body() dto: AuthSignUpDto) {
    return this.appService.signUp(dto);
  }

  @AuthSignInDto.buildSwagger()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  singIn(@Body() dto: AuthSignInDto) {
    return this.appService.signIn(dto);
  }

  /* USERS */
  // @UseGuards(AuthGuard)
  @FindOneUserDTO.buildSwagger()
  @Get('user')
  getUser(@Body() dto: FindOneUserDTO) {
    return this.appService.getUser(dto);
  }

  // @UseGuards(AuthGuard)
  @DeleteOneUserDTO.buildSwagger()
  @Delete('user')
  deleteUser(@Body() dto: DeleteOneUserDTO) {
    return this.appService.deleteUser(dto);
  }

  // @UseGuards(AuthGuard)
  @FindAllUserDTO.buildSwagger()
  @Get('users')
  getUsers(@Body() dto: FindAllUserDTO) {
    return this.appService.getUsers(dto);
  }

  /* ATTRS */
  // @UseGuards(AuthGuard)
  @CreateOneAttrDTO.buildSwagger()
  @Post('attr')
  createAttr(@Body() dto: CreateOneAttrDTO) {
    return this.appService.createAttr(dto);
  }

  // @UseGuards(AuthGuard)
  @FindOneAttrDTO.buildSwagger()
  @Get('attr')
  getAttr(@Body() dto: FindOneAttrDTO) {
    return this.appService.getAttr(dto);
  }

  // @UseGuards(AuthGuard)
  @DeleteOneAttrDTO.buildSwagger()
  @Delete('attr')
  deleteAttr(@Body() dto: DeleteOneAttrDTO) {
    return this.appService.deleteAttr(dto);
  }

  // @UseGuards(AuthGuard)
  @FindAllAttrDTO.buildSwagger()
  @Get('attrs')
  getAttrs(@Body() dto: FindAllAttrDTO) {
    return this.appService.getAttrs(dto);
  }

  /* ATTRS GROUPS */
  // @UseGuards(AuthGuard)
  @AttrGroupCreateOneDto.buildSwagger()
  @Post('attr/group')
  createAttrGroup(@Body() dto: AttrGroupCreateOneDto) {
    return this.appService.createAttrGroup(dto);
  }

  // @UseGuards(AuthGuard)
  @AttrGroupFindOneDto.buildSwagger()
  @Get('attr/group')
  getAttrGroup(@Body() dto: AttrGroupFindOneDto) {
    return this.appService.getAttrGroup(dto);
  }

  // @UseGuards(AuthGuard)
  @AttrGroupDeleteOneDto.buildSwagger()
  @Delete('attr/group')
  deleteAttrGroup(@Body() dto: AttrGroupDeleteOneDto) {
    return this.appService.deleteAttrGroup(dto);
  }

  // @UseGuards(AuthGuard)
  @AttrGroupFindAllDto.buildSwagger()
  @Get('attrs/groups')
  getAttrsGroup(@Body() dto: AttrGroupFindAllDto) {
    return this.appService.getAttrsGroup(dto);
  }

  /* DOCS */
  // @UseGuards(AuthGuard)
  @DocFindOneDto.buildSwagger()
  @Get('doc')
  getDoc(@Body() dto: DocFindOneDto) {
    return this.appService.getDoc(dto);
  }

  // @UseGuards(AuthGuard)
  @DocFindAllDto.buildSwagger()
  @Get('docs')
  getDocs(@Body() dto: DocFindAllDto) {
    return this.appService.getDocs(dto);
  }
}
