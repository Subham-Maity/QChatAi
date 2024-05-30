import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async createChat(@Body() createChatDto: CreateChatDto) {
    const userId = createChatDto.userId;

    if (!userId) {
      throw new Error('You must be logged in to create a chat');
    }
    return await this.chatService.createChat(createChatDto, userId);
  }
  @Get(':userId/:chatId')
  async getChat(
    @Param('userId') userId: string,
    @Param('chatId') chatId: string,
  ) {
    return this.chatService.getChat(userId, parseInt(chatId));
  }
  @Post('saveUserMessage')
  async saveUserMessage(
    @Body('chatId') chatId: string,
    @Body('content') content: string,
  ) {
    return this.chatService.saveUserMessage(parseInt(chatId), content);
  }

  @Post('saveAIMessage')
  async saveAIMessage(
    @Body('chatId') chatId: string,
    @Body('content') content: string,
  ) {
    return this.chatService.saveAIMessage(parseInt(chatId), content);
  }

  @Get(':chatId')
  async getChatById(@Param('chatId') chatId: string) {
    return this.chatService.getChatByChatId(parseInt(chatId));
  }
  @Post('getChat')
  async getChatMessages(@Body('chatId') chatId: string) {
    return this.chatService.getChatMessages(parseInt(chatId));
  }
  @Get('chat/allChat/:userId')
  async getAllChats(@Param('userId') userId: string) {
    return this.chatService.getAllChats(userId);
  }
}
