import {
  AttrGroupCreateOneDto,
  AttrGroupDeleteOneDto,
  AttrGroupFindAllDto,
  AttrGroupFindOneDto,
} from '@apps/attr-group/src/attr-group.dto';
import { AttrGroupMessage } from '@apps/attr-group/src/attr-group.message';
import {
  CreateOneAttrDTO,
  DeleteOneAttrDTO,
  FindAllAttrDTO,
  FindOneAttrDTO,
} from '@apps/attr/src/attr.dto';
import { AttrMessage } from '@apps/attr/src/attr.message';
import { AuthSignInDto, AuthSignUpDto } from '@apps/auth/src/auth.dto';
import { AuthMessage } from '@apps/auth/src/auth.message';
import { DocFindAllDto, DocFindOneDto } from '@apps/doc/src/doc.dto';
import { DocMessage } from '@apps/doc/src/doc.message';
import {
  DeleteOneUserDTO,
  FindAllUserDTO,
  FindOneUserDTO,
} from '@apps/user/src/user.dto';
import { UserMessage } from '@apps/user/src/user.message';
import {
  ATTR_GROUP_SERVICE,
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
    @Inject(ATTR_GROUP_SERVICE) private readonly attrGroupClient: ClientProxy,
    @Inject(DOC_SERVICE) private readonly docClient: ClientProxy,
  ) {}

  /* AUTH */
  public signUp(dto: AuthSignUpDto) {
    return firstValueFrom(this.authClient.send(AuthMessage.signUp, dto));
  }

  public signIn(dto: AuthSignInDto) {
    return firstValueFrom(this.authClient.send(AuthMessage.signIn, dto));
  }

  /* USERS */
  public getUser(dto: FindOneUserDTO) {
    return firstValueFrom(this.userClient.send(UserMessage.findOne, dto));
  }

  public deleteUser(dto: DeleteOneUserDTO) {
    return firstValueFrom(this.userClient.send(UserMessage.deleteOne, dto));
  }
  public getUsers(dto: FindAllUserDTO) {
    return firstValueFrom(this.userClient.send(UserMessage.findAll, dto));
  }

  /* ATTRS */
  public createAttr(dto: CreateOneAttrDTO) {
    return firstValueFrom(this.attrClient.send(AttrMessage.createOne, dto));
  }

  public getAttr(dto: FindOneAttrDTO) {
    return firstValueFrom(this.attrClient.send(AttrMessage.findOne, dto));
  }

  public deleteAttr(dto: DeleteOneAttrDTO) {
    return firstValueFrom(this.attrClient.send(AttrMessage.deleteOne, dto));
  }

  public getAttrs(dto: FindAllAttrDTO) {
    return firstValueFrom(this.attrClient.send(AttrMessage.findAll, dto));
  }

  /* ATTR GROUPS */
  public createAttrGroup(dto: AttrGroupCreateOneDto) {
    return firstValueFrom(
      this.attrGroupClient.send(AttrGroupMessage.createOne, dto),
    );
  }

  public getAttrGroup(dto: AttrGroupFindOneDto) {
    return firstValueFrom(
      this.attrGroupClient.send(AttrGroupMessage.findOne, dto),
    );
  }

  public deleteAttrGroup(dto: AttrGroupDeleteOneDto) {
    return firstValueFrom(
      this.attrGroupClient.send(AttrGroupMessage.deleteOne, dto),
    );
  }

  public getAttrsGroup(dto: AttrGroupFindAllDto) {
    return firstValueFrom(
      this.attrGroupClient.send(AttrGroupMessage.findAll, dto),
    );
  }

  /* DOCS */
  public getDoc(dto: DocFindOneDto) {
    return firstValueFrom(this.docClient.send(DocMessage.findOne, dto));
  }

  public getDocs(dto: DocFindAllDto) {
    return firstValueFrom(this.docClient.send(DocMessage.findAll, dto));
  }
}
