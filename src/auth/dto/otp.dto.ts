import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum OtpRequestReason {
  'signup' = 'signup',
  'resetpassword' = 'resetpassword',
}

export class RequestOtpDto {
  @IsString()
  @IsNotEmpty()
  emailOrPhone: string;

  @IsEnum(OtpRequestReason)
  reason: OtpRequestReason;
}

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  emailOrPhone: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
