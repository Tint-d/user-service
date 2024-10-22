import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import * as speakeasy from 'speakeasy';
import { PrismaService } from 'src/prisma/prisma.service';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  async register(emailOrPhone: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { emailOrPhone, password: hashedPassword },
    });
  }

  async login(emailOrPhone: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { emailOrPhone } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async requestOtp() {
    return this.otpService.requestOtp({
      emailOrPhone: '09762993470',
      reason: '',
    });
  }
}
