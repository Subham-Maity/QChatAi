import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenaiController } from './openai.controller';
import OpenAI from 'openai';
@Module({
  controllers: [OpenaiController],
  imports: [ConfigModule.forRoot()],
  providers: [
    OpenaiService,
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) =>
        new OpenAI({ apiKey: configService.getOrThrow('OPENAI_API_KEY') }),
      inject: [ConfigService],
    },
  ],
  exports: [OpenaiService],
})
export class OpenaiModule {}
