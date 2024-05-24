import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AllExceptionsFilter,
  ApiDocReady,
  configureCors,
  logApplicationDetails,
  logServerReady,
  setupSecurity,
} from './common';
import { ConfigService } from '@nestjs/config';

const port: number = 3333;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  setupSecurity(app);
  configureCors(app, configService);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(configService.get('port') || port);
  return configService;
}
bootstrap().then((configService) => {
  logServerReady(configService.get('port') || port);
  logApplicationDetails(configService);
  ApiDocReady(configService.get('port') || port, configService);
});
