import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { OtpService } from './otp.service';
// import { RequestOtpDto } from './dto/otp.dto';

export class OnlyMessageResponse {
  message: string;
}

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('request-otp')
  async requestOtp() {
    return 'Hello';
  }
}
