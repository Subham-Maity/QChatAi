import { Injectable, Logger } from '@nestjs/common';
import { OpenAIApi, Configuration } from 'openai-edge';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiService {
  private readonly logger = new Logger(OpenaiService.name);
  private openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    const config = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(config);
  }

  async getEmbeddings(text: string): Promise<number[]> {
    try {
      const response = await this.openai.createEmbedding({
        model: 'text-embedding-3-small',
        input: text.replace(/\n/g, ' '),
      });
      const result = await response.json();
      //it's gonna be a vector of size 1536
      //this embedding is merely a vector of multi dimentional
      return result.data[0].embedding as number[];
    } catch (error) {
      this.logger.error('Error getting embeddings:', error);
      throw error;
    }
  }
}
