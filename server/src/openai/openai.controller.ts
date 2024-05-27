import { Body, Controller, Post } from '@nestjs/common';

import { OpenaiService } from './openai.service';
import { CreateChatCompletionRequest } from './dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('chatCompletion')
  async createChatCompletion(@Body() body: CreateChatCompletionRequest) {
    return this.openaiService.createChatCompletion(body.messages);
  }
}
