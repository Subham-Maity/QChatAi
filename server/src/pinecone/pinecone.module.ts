import { Module } from '@nestjs/common';
import { PineconeService } from './service/pinecone.service';
import { PineconeController } from './pinecone.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadService } from '../upload';
import OpenAI from 'openai';
import { OpenaiService } from '../openai';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PineconeController],
  providers: [
    PineconeService,
    UploadService,
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) =>
        new OpenAI({ apiKey: configService.getOrThrow('OPENAI_API_KEY') }),
      inject: [ConfigService],
    },
    OpenaiService,
  ],
  exports: [],
})
export class PineconeModule {}
