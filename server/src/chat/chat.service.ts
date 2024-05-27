import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto';
import { PineconeService } from '../pinecone';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly pineconeService: PineconeService,
    private readonly prisma: PrismaService,
  ) {}
  async createChat(createChatDto: CreateChatDto, userId: string) {
    await this.pineconeService.loadS3IntoPinecone(createChatDto.fileKey);
    // Create a new chat record in the database
    return this.prisma.chat.create({
      data: {
        pdfName: createChatDto.fileName,
        pdfUrl: createChatDto.fileKey,
        userId,
        fileKey: createChatDto.fileKey,
      },
    });
  }
}
