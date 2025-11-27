import { AttrFindAllDto, AttrFindOneDto } from '@apps/attr/src/attr.dto';
import { AttrMessage } from '@apps/attr/src/attr.message';
import { AuthSignInDto, AuthSignUpDto } from '@apps/auth/src/auth.dto';
import { AuthMessage } from '@apps/auth/src/auth.message';
import { DocFindAllDto, DocFindOneDto } from '@apps/doc/src/doc.dto';
import { DocMessage } from '@apps/doc/src/doc.message';
import {
  DeleteUserOneDto,
  UserFindAllDto,
  UserFindOneDto,
} from '@apps/user/src/user.dto';
import { UserMessage } from '@apps/user/src/user.message';
import {
  ATTR_SERVICE,
  AUTH_SERVICE,
  DOC_SERVICE,
  USER_SERVICE,
} from '@libs/constant';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject(USER_SERVICE) private readonly userClient: ClientProxy,
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    @Inject(ATTR_SERVICE) private readonly attrClient: ClientProxy,
    @Inject(DOC_SERVICE) private readonly docClient: ClientProxy,
  ) {}

  signUp(dto: AuthSignUpDto) {
    return firstValueFrom(this.authClient.send(AuthMessage.signUp, dto));
  }

  signIn(dto: AuthSignInDto) {
    return firstValueFrom(this.authClient.send(AuthMessage.signIn, dto));
  }

  getUser(dto: UserFindOneDto = { username: '' }) {
    return firstValueFrom(this.userClient.send(UserMessage.findOne, dto));
  }

  deleteUser(dto: DeleteUserOneDto) {
    return firstValueFrom(this.userClient.send(UserMessage.deleteOne, dto));
  }

  getUsers(dto: UserFindAllDto = {}) {
    return firstValueFrom(this.userClient.send(UserMessage.findAll, dto));
  }

  getAttr(dto: AttrFindOneDto = {}) {
    return firstValueFrom(this.attrClient.send(AttrMessage.findOne, dto));
  }

  getAttrs(dto: AttrFindAllDto = {}) {
    return firstValueFrom(this.attrClient.send(AttrMessage.findAll, dto));
  }

  getDoc(dto: DocFindOneDto = {}) {
    return firstValueFrom(this.docClient.send(DocMessage.findOne, dto));
  }

  getDocs(dto: DocFindAllDto = {}) {
    return firstValueFrom(this.docClient.send(DocMessage.findAll, dto));
  }
}
