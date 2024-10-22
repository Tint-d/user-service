import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class authRepository {
  constructor(private readonly config: ConfigService) {}
}
