import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
@Injectable()
export class BullConfig {
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  /*-----------------------------------*/
  /**������������CONFIGURATION������������*/
  /*__________________________________*/
  //Common

  get RedisHost(): string {
    return this.configService.get<string>('REDIS_HOST') || host;
  }

  //Gmail email--app-password

  get RedisPort(): number {
    return this.configService.get<number>('REDIS_PORT') || port;
  }

  get RedisUsername(): string {
    return this.configService.get<string>('REDIS_USERNAME') || username;
  }

  get RedisPassword(): string {
    return this.configService.get<string>('REDIS_PASSWORD') || password;
  }
}

const host = 'localhost';
const port = 6379;

const username = 'XXXXXXX';
const password = 'XXXXXXX';
