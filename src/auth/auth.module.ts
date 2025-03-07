import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { OtpService } from './otp.service';
import { RedisService } from 'src/redis/redis.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [OtpService, RedisService, AuthService],
})
export class AuthModule {}
