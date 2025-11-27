import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      UserModule,
      { transport: Transport.TCP, options: { host: 'localhost', port: 3001 } },
    );

    await app.listen();

    console.log('User Service is listening on port 3001');
  } catch (error) {
    console.error('Fatal error during application bootstrap:', error);
    process.exit(1);
  }
}

void bootstrap();
