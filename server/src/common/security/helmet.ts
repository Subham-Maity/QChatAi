import helmet from 'helmet';
import { INestApplication } from '@nestjs/common';

export const setupSecurity = (app: INestApplication<any>) => {
  // Use Helmet to set security-related HTTP headers
  app.use(helmet());

  // Set Cross-Origin Resource Policy
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

  // Use HTTP Strict Transport Security (HSTS) to force clients to use HTTPS
  app.use(helmet.hsts());

  //This will hide the "X-Powered-By" header in responses.
  app.use(helmet.hidePoweredBy());

  // Prevents clickjacking attacks by setting the X-Frame-Options header
  app.use(helmet.frameguard({ action: 'deny' }));

  // Protect against Cross-Site Scripting (XSS) attacks by setting the X-XSS-Protection header
  app.use(helmet.xssFilter());
};
