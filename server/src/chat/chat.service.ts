import { Injectable, Logger } from '@nestjs/common';
import { CreateChatDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { BullService } from '../queue';
import { RedisService } from '../redis';
import { chats_key_prefix_for_redis } from '../redis/constant/redis-constant';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bullService: BullService,
    private readonly redisService: RedisService,
  ) {}
  async createChat(createChatDto: CreateChatDto, userId: string) {
    const { title, description, fileKey, fileName } = createChatDto;
    // Assign default values if title or description is not provided
    const defaultTitle = 'Untitled';
    const defaultDescription =
      'This is your PDF content you can check it out...';

    await this.bullService.addPineconeJob({
      fileKey: createChatDto.fileKey,
    });
    const newChat = await this.prisma.chat.create({
      data: {
        title: title || defaultTitle,
        description: description || defaultDescription,
        pdfName: fileName,
        userId,
        fileKey: fileKey,
        status: 'creating',
      },
    });
    // Clear the cache for chats of the user
    await this.redisService.delPatternSpecific(
      `${chats_key_prefix_for_redis}:${userId}`,
    );
    Logger.debug(
      `fn: createChat, Cache cleared for pattern ${chats_key_prefix_for_redis}:${userId}*`,
    );
    return newChat;
  }
  async getChat(userId: string, chatId: number) {
    const cacheKey = `${chats_key_prefix_for_redis}:${userId}:${chatId}`;

    try {
      const cachedChat = await this.redisService.get(cacheKey);
      if (cachedChat) {
        Logger.debug(`fn: getChat, Cache hit for ${cacheKey}`);
        return cachedChat;
      }
    } catch (error) {
      Logger.error(
        `fn: getChat, Error getting data from Redis for key ${cacheKey}`,
        error,
      );
    }

    Logger.debug(`fn: getChat, Cache miss`);

    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    try {
      await this.redisService.set(cacheKey, chat, 50);
    } catch (error) {
      Logger.error('fn: getChat, Error setting data to Redis', error);
    }

    return chat;
  }
  async saveUserMessage(chatId: number, content: string) {
    const newMessage = await this.prisma.message.create({
      data: {
        chatId,
        content,
        role: 'user',
      },
    });

    // Clear the cache for the chat
    await this.redisService.delPatternSpecific(
      `${chats_key_prefix_for_redis}:${chatId}`,
    );
    Logger.debug(
      `fn: saveUserMessage, Cache cleared for key ${chats_key_prefix_for_redis}:${chatId}`,
    );

    return newMessage;
  }

  async saveAIMessage(chatId: number, content: string) {
    const newMessage = await this.prisma.message.create({
      data: {
        chatId,
        content,
        role: 'system',
      },
    });

    // Clear the cache for the chat
    await this.redisService.delPatternSpecific(
      `${chats_key_prefix_for_redis}:${chatId}`,
    );
    Logger.debug(
      `fn: saveAIMessage, Cache cleared for key ${chats_key_prefix_for_redis}:${chatId}`,
    );

    return newMessage;
  }

  async getChatByChatId(chatId: number) {
    const cacheKey = `${chats_key_prefix_for_redis}:${chatId}`;

    try {
      const cachedChat = await this.redisService.get(cacheKey);
      if (cachedChat) {
        Logger.debug(`fn: getChatByChatId, Cache hit for ${cacheKey}`);
        return cachedChat;
      }
    } catch (error) {
      Logger.error(
        `fn: getChatByChatId, Error getting data from Redis for key ${cacheKey}`,
        error,
      );
    }

    Logger.debug(`fn: getChatByChatId, Cache miss`);

    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    try {
      await this.redisService.set(cacheKey, chat, 3600); // Cache for 1 hour
    } catch (error) {
      Logger.error('fn: getChatByChatId, Error setting data to Redis', error);
    }

    return chat;
  }
  async getChatMessages(chatId: number) {
    const cacheKey = `${chats_key_prefix_for_redis}:${chatId}:messages`;

    try {
      const cachedMessages = await this.redisService.get(cacheKey);
      if (cachedMessages) {
        Logger.debug(`fn: getChatMessages, Cache hit for ${cacheKey}`);
        return cachedMessages;
      }
    } catch (error) {
      Logger.error(
        `fn: getChatMessages, Error getting data from Redis for key ${cacheKey}`,
        error,
      );
    }

    Logger.debug(`fn: getChatMessages, Cache miss`);

    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    try {
      await this.redisService.set(cacheKey, chat.messages, 3600); // Cache for 1 hour
    } catch (error) {
      Logger.error('fn: getChatMessages, Error setting data to Redis', error);
    }

    return chat.messages;
  }
  async getAllChats(userId: string) {
    const cacheKey = `${chats_key_prefix_for_redis}:${userId}`;

    try {
      const cachedChats = await this.redisService.get(cacheKey);
      if (cachedChats) {
        Logger.debug(`fn: getAllChats, Cache hit for ${cacheKey}`);
        return cachedChats;
      }
    } catch (error) {
      Logger.error(
        `fn: getAllChats, Error getting data from Redis for key ${cacheKey}`,
        error,
      );
    }

    Logger.debug(`fn: getAllChats, Cache miss`);

    const chats = await this.prisma.chat.findMany({
      where: { userId },
    });

    try {
      await this.redisService.set(cacheKey, chats, 3600); // Cache for 1 hour
    } catch (error) {
      Logger.error('fn: getAllChats, Error setting data to Redis', error);
    }

    return chats;
  }
}
