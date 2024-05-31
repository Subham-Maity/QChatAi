import { Global, Module } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RedisService } from './redis.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StoreConfig } from 'cache-manager';
import { RedisController } from './redis.controller';
import { RedisConfig } from './config';
// import { redisStore } from 'cache-manager-redis-store';
@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = new RedisConfig(configService);
        return {
          /**
           * - uncomment `store` when you are using local redis
           * - docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
           * - docker start redis-stack*/

          // store: redisStore,
          redis: {
            host: redisConfig.RedisHost,
            port: redisConfig.RedisPort,
            username: redisConfig.RedisUsername,
            password: redisConfig.RedisPassword,
          },
          // disable offline queue
          enableOfflineQueue: false,
          //disable offline queue
          redisCommandOptions: { enableOfflineQueue: false },
        } as StoreConfig;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [RedisController],
  providers: [
    RedisService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    RedisConfig,
  ],
  exports: [RedisService],
})
export class RedisModule {}
