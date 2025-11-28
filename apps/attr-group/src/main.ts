import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AttrGroupModule } from './attr-group.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AttrGroupModule,
      { transport: Transport.TCP, options: { host: 'localhost', port: 3005 } },
    );

    await app.listen();

    console.log('Attr Group Service is listening on port 3005');
  } catch (error) {
    console.error('Fatal error during application bootstrap:', error);
    process.exit(1);
  }
}

void bootstrap();
