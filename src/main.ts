import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EnvValidationSchema } from './utils/env.validation';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const configService =
    app.get<ConfigService<EnvValidationSchema>>(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
  logger.log(`HTTP server is running on port 3000`);

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'redis',
      port: 6379,
    },
  });

  await microservice.listen();
  logger.log(`Redis microservice is running`);
}

bootstrap();
