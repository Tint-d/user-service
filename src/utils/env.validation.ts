import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class EnvValidationSchema {
  @IsNotEmpty()
  @IsUrl()
  DATABASE_URL: string;

  @IsNotEmpty()
  @IsString()
  JWT_SERCERT: string;

  @IsNotEmpty()
  @IsString()
  Client_ID: string;

  @IsNotEmpty()
  @IsString()
  Client_Secret: string;

  @IsNotEmpty()
  @IsEmail()
  EMAIL_USER: string;

  @IsNotEmpty()
  @IsString()
  EMAIL_PASS: string;

  @IsNotEmpty()
  @IsString()
  OAUTH_REFRESH_TOKEN: string;

  @IsNotEmpty()
  @IsString()
  OAUTH_ACCESS_TOKEN: string;

  @IsNotEmpty()
  @IsString()
  OAUTH_CLIENT_ID: string;

  @IsNotEmpty()
  @IsString()
  OAUTH_CLIENT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  REDIS_HOST: string;

  @IsNotEmpty()
  @IsString()
  OTP_SECRET: string;
}
