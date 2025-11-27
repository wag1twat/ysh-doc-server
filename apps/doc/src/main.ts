import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocModule } from './doc.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      DocModule,
      { transport: Transport.TCP, options: { host: 'localhost', port: 3002 } },
    );

    await app.listen();

    console.log('Doc Service is listening on port 3002');
  } catch (error) {
    console.error('Fatal error during application bootstrap:', error);
    process.exit(1);
  }
}

void bootstrap();
