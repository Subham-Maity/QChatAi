import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisConfig {
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  get RedisHost(): string {
    return this.configService.get<string>('REDIS_HOST') || 'localhost';
  }

  get RedisPort(): number {
    return this.configService.get<number>('REDIS_PORT') || 6379;
  }

  get RedisUsername(): string {
    return this.configService.get<string>('REDIS_USERNAME') || '';
  }

  get RedisPassword(): string {
    return this.configService.get<string>('REDIS_PASSWORD') || '';
  }
}
