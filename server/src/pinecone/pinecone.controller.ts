import { Controller } from '@nestjs/common';
import { PineconeService } from './service/pinecone.service';

@Controller('pinecone')
export class PineconeController {
  constructor(private readonly pineconeService: PineconeService) {}
}
