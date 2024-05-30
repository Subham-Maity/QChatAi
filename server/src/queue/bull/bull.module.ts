import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { BullService } from './bull.service';
import { BullConfig } from './config';
import { FAILED_PINECONE_QUEUE, PINECONE_QUEUE } from './constant';
import { PineconeService } from '../../pinecone';
import { PineconeProcessor } from './jobs';
import { UploadService } from '../../upload';
import { OpenaiService } from '../../openai';
import OpenAI from 'openai';

@Global()
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
    BullModule.registerQueue({
      name: PINECONE_QUEUE,
    }),
    BullModule.registerQueue({
      name: FAILED_PINECONE_QUEUE,
    }),
  ],
  providers: [
    BullConfig,
    BullService,
    PineconeService,
    PineconeProcessor,
    UploadService,
    OpenaiService,
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) =>
        new OpenAI({ apiKey: configService.getOrThrow('OPENAI_API_KEY') }),
      inject: [ConfigService],
    },
    OpenaiService,
  ],
  exports: [BullModule, BullService],
})
export class QueueModule {}
