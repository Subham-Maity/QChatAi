import { Module } from '@nestjs/common';
import { ContextService } from './context.service';
import { ContextController } from './context.controller';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { OpenaiService } from '../openai';

@Module({
  controllers: [ContextController],
  providers: [
    ContextService,
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) =>
        new OpenAI({ apiKey: configService.getOrThrow('OPENAI_API_KEY') }),
      inject: [ConfigService],
    },
    OpenaiService,
  ],
})
export class ContextModule {}
