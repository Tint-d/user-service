import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from './prisma/prisma.module';
import { HelloController } from './hello/hello.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // RabbitMQ client setup
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'user_service',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    RedisModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [HelloController],
  providers: [],
  exports: [],
})
export class AppModule {}
