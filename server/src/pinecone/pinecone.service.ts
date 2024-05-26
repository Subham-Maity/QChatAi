import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { UploadService } from '../upload/upload.service';
import { ConfigService } from '@nestjs/config';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};
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
    // 1. Download and read PDF from S3
    console.log('downloading s3 into file system');
    const fileStream: any = await this.uploadService.downloadFromS3(fileKey);
    if (!fileStream) {
      throw new Error('could not download from s3');
    }
    console.log('loading pdf into memory' + fileStream);
    const pdf_loader = new PDFLoader(fileStream);
    return (await pdf_loader.load()) as PDFPage[];
  }
}
