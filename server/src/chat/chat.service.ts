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
      return null;
    }

    const currentChat = chats.find((chat) => chat.id === chatId);

    if (!currentChat) {
      return null;
    }

    return currentChat;
  }
  async saveUserMessage(chatId: number, content: string) {
    return this.prisma.message.create({
      data: {
        chatId,
        content,
        role: 'user',
      },
    });
  }

  async saveAIMessage(chatId: number, content: string) {
    return this.prisma.message.create({
      data: {
        chatId,
        content,
        role: 'system',
      },
    });
  }

  async getChatByChatId(chatId: number) {
    console.log(chatId + 'chatId');
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    return chat;
  }
  async getChatMessages(chatId: number) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    return chat.messages;
  }
}
