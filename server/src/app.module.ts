import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common';
import { UploadModule } from './upload';
import { ChatModule } from './chat';
import { PineconeModule } from './pinecone';
import { OpenaiModule } from './openai';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ChatModule,
    PineconeModule,
    OpenaiModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
