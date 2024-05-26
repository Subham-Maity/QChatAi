import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common';
import { ChatModule } from './chat/chat.module';
import { PineconeModule } from './pinecone/pinecone.module';

@Module({
  imports: [UploadModule, ConfigModule.forRoot({ isGlobal: true }), ChatModule, PineconeModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
