import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

import { ChatCompletionMessageParam } from 'openai/resources';
import { ChatCompletionMessageDto } from './dto';
@Injectable()
export class OpenaiService {
  private readonly logger = new Logger(OpenaiService.name);

  constructor(private readonly openai: OpenAI) {}

  async createChatCompletion(messages: ChatCompletionMessageDto[]) {
    return this.openai.chat.completions.create({
      messages: messages as ChatCompletionMessageParam[],
      model: 'gpt-3.5-turbo',
    });
  }
  async getEmbeddings(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text.replace(/\n/g, ' '),
      });

      if (response.data && response.data.length > 0) {
        return response.data[0].embedding;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }
}
