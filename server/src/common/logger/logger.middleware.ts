import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const colorCombinations = [
  '\x1b[31m', // Red
  '\x1b[32m', // Green
  '\x1b[33m', // Yellow
  '\x1b[34m', // Blue
  '\x1b[35m', // Magenta
  '\x1b[36m', // Cyan
  '\x1b[37m', // White
  '\x1b[38;5;208m', // Orange
];

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private requestNumber = 0;

  use(request: Request, response: Response, next: NextFunction): void {
    this.requestNumber++;
    const { ip, method, originalUrl, headers, body, protocol, httpVersion } =
      request;
    const userAgent = request.get('user-agent') || '';

    const now = new Date();
    const dateTime = now.toLocaleString('en-GB', { hour12: true });

    const numberColor =
      colorCombinations[(this.requestNumber - 1) % colorCombinations.length];

    console.log(
      `\x1b[34m[#${numberColor}${this.requestNumber}\x1b[34m] \x1b[0m\x1b[34m⇝⫸\x1b[0m \x1b[33m${method}\x1b[0m \x1b[34m${originalUrl}\x1b[0m \x1b[34m⇝⫸\x1b[0m \x1b[32m${userAgent}\x1b[34m⇝⫸\x1b[0m \x1b[32m${ip}\x1b[0m \x1b[34m⇝⫸\x1b[0m ${protocol} \x1b[34m⇝⫸\x1b[0m HTTP/${httpVersion} \x1b[34m⇝⫸\x1b[0m \x1b[35m${dateTime}\x1b[0m \x1b[34m⇝⫸\x1b[0m`,
    );
    console.log(
      `\x1b[34m[#${numberColor}${this.requestNumber}\x1b[34m] \x1b[0m\x1b[34m⇝⫸\x1b[0m Headers: ${JSON.stringify(headers)} \x1b[34m⇝⫸\x1b[0m`,
    );
    console.log(
      `\x1b[34m[#${numberColor}${this.requestNumber}\x1b[34m] \x1b[0m\x1b[34m⇝⫸\x1b[0m Body: ${JSON.stringify(body)} \x1b[34m⇝⫸\x1b[0m`,
    );

    const start = Date.now();

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const end = Date.now();
      const latency = end - start;

      const latencyColor =
        latency <= 300
          ? '\x1b[32m' // Green
          : latency <= 1000
            ? '\x1b[33m' // Yellow
            : '\x1b[31m'; // Red

      console.log(
        `\x1b[34m[#${numberColor}${this.requestNumber}\x1b[34m] \x1b[0m\x1b[34m⇝⫸\x1b[0m \x1b[33m${method}\x1b[0m \x1b[34m${originalUrl}\x1b[0m ${statusCode} ${contentLength} \x1b[34m⇝⫸\x1b[0m \x1b[32m${userAgent}\x1b[0m \x1b[34m⇝⫸\x1b[0m \x1b[32m${ip}\x1b[0m \x1b[34m⇝⫸\x1b[0m ${latencyColor}+${latency}ms\x1b[0m \x1b[1m\x1b[35m[END]\x1b[0m`,
      );
    });

    next();
  }
}
