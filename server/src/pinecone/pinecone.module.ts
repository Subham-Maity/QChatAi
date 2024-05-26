import { Module } from '@nestjs/common';
import { PineconeService } from './service/pinecone.service';
import { PineconeController } from './pinecone.controller';

import { ConfigModule } from '@nestjs/config';
import { UploadService } from '../upload';
import { OpenaiModule, OpenaiService } from '../openai';

@Module({
  imports: [ConfigModule, OpenaiModule],
  controllers: [PineconeController],
  providers: [PineconeService, UploadService, OpenaiService],
  exports: [OpenaiService],
})
export class PineconeModule {}
