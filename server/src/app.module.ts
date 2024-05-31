import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common';
import { UploadModule } from './upload';
import { ChatModule } from './chat';
import { PineconeModule } from './pinecone';
import { OpenaiModule } from './openai';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ClerkAuthGuard } from './auth/guard';
import { ContextModule } from './context/context.module';
import { QueueModule } from './queue/bull/bull.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ChatModule,
    PineconeModule,
    OpenaiModule,
    PrismaModule,
    AuthModule,
    ContextModule,
    QueueModule,
    RedisModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: ClerkAuthGuard,
  //   },
  // ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
