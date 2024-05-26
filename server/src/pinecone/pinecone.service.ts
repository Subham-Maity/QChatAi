import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { UploadService } from '../upload/upload.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PineconeService {
  private readonly pineconeClient: Pinecone;

  constructor(
    private readonly uploadService: UploadService,
    private configService: ConfigService,
  ) {
    const pineConeApiKey: string = this.configService.get('PINECONE_API_KEY');
    this.pineconeClient = new Pinecone({
      apiKey: pineConeApiKey,
    });
  }
  async loadS3IntoPinecone(fileKey: string) {
    // 1. obtain the pdf -> download and read from pdf
    console.log('downloading s3 into file system');
    const fileStream = await this.uploadService.downloadFromS3(fileKey);
    console.log(fileStream);
  }
}
