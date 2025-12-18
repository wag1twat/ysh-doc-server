import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AllHttpExceptionFilter } from './all-http-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3001 },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3002 },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3003 },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3004 },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3005 },
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
    .addTag('auth')
    .addTag('users')
    .addTag('attrs')
    .addTag('attrs-groups')
    .addTag('docs')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    autoTagControllers: false,
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

void bootstrap();
