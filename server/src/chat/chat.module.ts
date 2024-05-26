import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PineconeService } from '../pinecone/pinecone.service';
import { UploadService } from '../upload/upload.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, PineconeService, UploadService],
})
export class ChatModule {}
