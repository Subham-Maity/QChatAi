import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto';
import { PineconeService } from '../pinecone/pinecone.service';

@Injectable()
export class ChatService {
  constructor(private readonly pineconeService: PineconeService) {}
  async createChat(createChatDto: CreateChatDto) {
    return await this.pineconeService.loadS3IntoPinecone(createChatDto.fileKey);
  }
}
