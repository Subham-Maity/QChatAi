import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

//if database url show "Database is connected" else show "Database is not connected"
export function logApplicationDetails(configService: ConfigService) {
  if (configService.get('DATABASE_URL')) {
    Logger.debug('Database is connected');
  } else {
    Logger.debug('Database is not connected');
  }
  if (configService.get('port')) {
    Logger.debug('Server is running on port ' + configService.get('port'));
  } else {
    Logger.debug('There is no port defined in the .env file');
  }
}
export function logServerReady(port: string | number) {
  Logger.verbose(`Server ready at http://localhost:${port}`);
}

export function ApiDocReady(
  port: string | number,
  configService: ConfigService,
) {
  Logger.verbose(
    `Doc available at http://localhost:${port}/${configService.get('API_DOC_URL')}`,
  );
}
