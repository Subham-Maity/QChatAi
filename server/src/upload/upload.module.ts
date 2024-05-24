import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.getOrThrow('UPLOAD_RATE_TTL'),
          limit: config.getOrThrow('UPLOAD_RATE_LIMIT'),
        },
      ],
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
