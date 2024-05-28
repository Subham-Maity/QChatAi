import clerkClient from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger();

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const rawHeaders = request.rawHeaders.join();

    const cookieStart = rawHeaders.indexOf('__session=');
    if (cookieStart === -1) {
      console.log('Session cookie not found');
      return false;
    }
    const cookieEnd = rawHeaders.indexOf(';', cookieStart);
    const sessionCookie = rawHeaders.slice(
      cookieStart,
      cookieEnd !== -1 ? cookieEnd : undefined,
    );
    try {
      const token = sessionCookie.split('=')[1];
      await clerkClient.verifyToken(token);
      return true;
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }
}
