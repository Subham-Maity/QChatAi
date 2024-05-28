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
        pdfUrl: createChatDto.fileUrl,
        userId,
        fileKey: createChatDto.fileKey,
      },
    });
  }
  async getChat(userId: string, chatId: number) {
    const chats = await this.prisma.chat.findMany({
      where: { userId },
    });

    if (!chats || chats.length === 0) {
      // Handle the case where no chats are found for the user
      return null;
    }

    const currentChat = chats.find((chat) => chat.id === chatId);

    if (!currentChat) {
      // Handle the case where the requested chat is not found
      return null;
    }

    return currentChat;
  }
}
