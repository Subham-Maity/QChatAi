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
    @Body('chatId') chatId: number,
    @Body('content') content: string,
  ) {
    return this.chatService.saveUserMessage(chatId, content);
  }

  @Post('saveAIMessage')
  async saveAIMessage(
    @Body('chatId') chatId: number,
    @Body('content') content: string,
  ) {
    return this.chatService.saveAIMessage(chatId, content);
  }

  @Get(':chatId')
  async getChatById(@Param('chatId') chatId: string) {
    return this.chatService.getChatByChatId(parseInt(chatId));
  }
}
