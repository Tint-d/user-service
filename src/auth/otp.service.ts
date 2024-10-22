import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import * as speakeasy from 'speakeasy';
import { EnvValidationSchema } from 'src/utils/env.validation';
// import Redis from 'ioredis'; // Import Redis type if needed
// import { EnvValidationSchema } from 'src/utils/env.validation';

@Injectable()
export class OtpService {
  private readonly DEFAULT_OTP_EXPIRATION = 300; // 5 minutes
  private readonly VERIFIED_OTP_EXPIRATION = 3600; // 1 hour
  private readonly redis: RedisService;
  private readonly configService: ConfigService<EnvValidationSchema>;

  async requestOtp({ emailOrPhone, reason }) {
    const otp = speakeasy.totp({
      secret: this.configService.get('OTP_SECRET'),
      encoding: 'base32',
      digits: 6,
    });
    const existingOtp = await this.redis.get(emailOrPhone);
    if (existingOtp) {
      throw new ConflictException('An OTP has already been requested.');
    }
    await this.redis.set(emailOrPhone, otp, this.DEFAULT_OTP_EXPIRATION);
    await this.sendOtp(emailOrPhone, otp, reason);
    return { message: 'OTP sent successfully' };
  }
  // Verify OTP
  async verifyOtp(emailOrPhone: string, otp: string) {
    const storedOtp = await this.redis.get(emailOrPhone);
    if (!storedOtp || storedOtp !== otp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }
    // If OTP is valid, mark it as verified
    await this.redis.hset(emailOrPhone, 'verified', 'true');
    await this.redis.expire(emailOrPhone, this.VERIFIED_OTP_EXPIRATION);
    return { message: 'OTP verified successfully' };
  }
  // Check OTP verification status
  async checkOtpVerificationStatus(emailOrPhone: string): Promise<void> {
    const verified = await this.redis.hget(emailOrPhone, 'verified');
    if (verified !== 'true') {
      throw new UnauthorizedException('Please finish OTP verification first.');
    }
    await this.redis.del(emailOrPhone); // Clean up after verification
  }
  // // Example of an OTP sending function (via email/SMS)
  private async sendOtp(emailOrPhone: string, otp: string, reason: string) {
    console.log(`Sending OTP ${otp} to ${emailOrPhone} for ${reason}`);
  }
}
