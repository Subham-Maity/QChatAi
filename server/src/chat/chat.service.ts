import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto';

@Injectable()
export class ChatService {
  async createChat(createChatDto: CreateChatDto) {
    console.log(createChatDto);
  }
}
