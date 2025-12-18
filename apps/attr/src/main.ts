import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AttrModule } from './attr.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AttrModule,
      {
        transport: Transport.TCP,
        options: { host: 'localhost', port: +process.env.ATTR_SERVICE_PORT! },
      },
    );

    await app.listen();

    console.log('Attr Service is listening on port 3003');
  } catch (error) {
    console.error('Fatal error during application bootstrap:', error);
    process.exit(1);
  }
}

void bootstrap();
