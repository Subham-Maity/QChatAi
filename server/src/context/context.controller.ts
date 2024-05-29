import { Body, Controller, Post } from '@nestjs/common';
import { ContextService } from './context.service';

@Controller('context')
export class ContextController {
  constructor(private readonly contextService: ContextService) {}
  @Post('get-context')
  async getContext(
    @Body('query') query: string,
    @Body('fileKey') fileKey: string,
  ) {
    return this.contextService.getContext(query, fileKey);
  }
}
