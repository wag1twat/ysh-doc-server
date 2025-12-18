import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AllHttpExceptionFilter } from './all-http-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { authSwagger } from '@apps/auth/src/auth.swagger';
import { userSwagger } from '@apps/user/src/user.swagger';
import { attrSwagger } from '@apps/attr/src/attr.swagger';
import { attrGroupSwagger } from '@apps/attr-group/src/attr-group.swagger';
import { docSwagger } from '@apps/doc/src/doc.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: +process.env.AUTH_SERVICE_PORT! },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: +process.env.DOC_SERVICE_PORT! },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: +process.env.ATTR_SERVICE_PORT! },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: +process.env.ATTR_GROUP_SERVICE_PORT! },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: +process.env.USER_SERVICE_PORT! },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет поля не описанные в DTO
      forbidNonWhitelisted: true, // выбрасывает ошибку при наличии лишних полей
      transform: true, // преобразует типы данных
    }),
  );
  app.useGlobalFilters(new AllHttpExceptionFilter());

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('TURBO DOC')
    .setDescription('API')
    .setVersion('1.0')
    .addTag(authSwagger.tag)
    .addTag(userSwagger.tag)
    .addTag(attrSwagger.tag)
    .addTag(attrGroupSwagger.tag)
    .addTag(docSwagger.tag)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    autoTagControllers: false,
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_SERVICE_PORT!);
}

void bootstrap();
