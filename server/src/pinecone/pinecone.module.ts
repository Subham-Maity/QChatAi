import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone.service';
import { PineconeController } from './pinecone.controller';

@Module({
  controllers: [PineconeController],
  providers: [PineconeService],
})
export class PineconeModule {}
