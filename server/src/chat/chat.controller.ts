import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async createChat(@Body() createChatDto: CreateChatDto) {
    // Assuming you have the authenticated userId available in the request object
    const userId = createChatDto.userId;

    if (!userId) {
      throw new Error('You must be logged in to create a chat');
    }
    // Call the service method to create the chat
    return await this.chatService.createChat(createChatDto, userId);
  }
}
