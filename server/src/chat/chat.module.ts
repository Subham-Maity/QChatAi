import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PineconeModule, PineconeService } from '../pinecone';
import { UploadService } from '../upload';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { OpenaiModule } from '../openai';

@Module({
  imports: [PineconeModule, OpenaiModule],
  exports: [ChatService],
  controllers: [ChatController],
  providers: [ChatService, PineconeService, UploadService],
})
export class ChatModule {}
