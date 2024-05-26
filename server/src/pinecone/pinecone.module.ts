import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone.service';
import { PineconeController } from './pinecone.controller';
import { UploadService } from '../upload/upload.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [PineconeController],
  providers: [PineconeService, UploadService],
})
export class PineconeModule {}
