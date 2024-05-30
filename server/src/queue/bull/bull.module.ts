import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { BullService } from './bull.service';
import { BullConfig } from './config';
@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const bullConfig = new BullConfig(configService);
        return {
          redis: {
            host: bullConfig.RedisHost,
            port: bullConfig.RedisPort,
            username: bullConfig.RedisUsername,
            password: bullConfig.RedisPassword,
          },
          // Enable shared Redis connection
          useSharedConnection: true,
          // Enable ready check for Redis
          enableReadyCheck: true,
          // Enable offline queue mode
          enableOfflineQueue: true,
          streams: {
            // Enable Redis Streams
            enableStreams: true,
            // Maximum length of a Redis stream in milliseconds
            streamMaxLengthMaxMs: 5000,
            streamLogger: {
              level: 'debug',
            },
          },
        };
      },
    }),
  ],
  providers: [BullConfig, BullService],
  exports: [BullModule, BullService],
})
export class QueueModule {}
