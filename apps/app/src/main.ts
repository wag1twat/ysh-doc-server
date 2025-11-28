import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AllHttpExceptionFilter } from './all-http-exceptions.filter';

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

  await app.listen(3000);
}

void bootstrap();
