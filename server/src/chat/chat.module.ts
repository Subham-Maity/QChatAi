import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PineconeService } from '../pinecone';
import { UploadService } from '../upload';
import { OpenaiModule, OpenaiService } from '../openai';

@Module({
  imports: [OpenaiModule],
  exports: [ChatService],
  controllers: [ChatController],
  providers: [ChatService, PineconeService, UploadService, OpenaiService],
})
export class ChatModule {}
