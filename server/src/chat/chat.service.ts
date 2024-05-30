import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { BullService } from '../queue';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bullService: BullService,
  ) {}
  async createChat(createChatDto: CreateChatDto, userId: string) {
    await this.bullService.addPineconeJob({
      fileKey: createChatDto.fileKey,
    });
    return this.prisma.chat.create({
      data: {
        title: createChatDto.title,
        description: createChatDto.description,
        pdfName: createChatDto.fileName,
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
  async getAllChats(userId: string) {
    return this.prisma.chat.findMany({
      where: { userId },
    });
  }
}
