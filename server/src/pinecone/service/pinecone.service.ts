import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { UploadService } from '../../upload/upload.service';
import { ConfigService } from '@nestjs/config';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import {
  Document,
  RecursiveCharacterTextSplitter,
} from '@pinecone-database/doc-splitter';

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
    // 1. Extract txt form the PDF
    const fileStream: any = await this.uploadService.downloadFromS3(fileKey);
    if (!fileStream) {
      throw new Error('could not download from s3');
    }
    const pdf_loader = new PDFLoader(fileStream);
    const page: PDFPage[] = (await pdf_loader.load()) as PDFPage[];
    // 2. Text segmentation
    const documents: Document[] = await this.prepareDocument(page[0]);

    return pdf_loader;
  }

  // Purpose:  Truncate a string to a specified number of bytes,
  // ensuring that the resulting string does not exceed the given byte limit.
  private truncateStringByBytes = (str: string, bytes: number) => {
    // Encode the string as a Uint8Array
    const enc = new TextEncoder();
    // Encode the string, slice it to the specified number of bytes,
    // then decode it back to a string and return it
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
  };
  //Prepare a document for further processing by cleaning its content (removing newline characters) and
  // splitting it into smaller parts using a text splitter.
  private async prepareDocument(page: {
    pageContent: string;
    metadata: {
      loc: { pageNumber: number };
    };
  }) {
    // Extract pageContent and metadata from the input 'page' object
    let { pageContent } = page;
    const { metadata } = page; // 'metadata' is not reassigned, so 'const' is used

    // Remove all newline characters from the page content
    pageContent = pageContent.replace(/\n/g, '');

    // Create an instance of RecursiveCharacterTextSplitter to split the documents
    const splitter = new RecursiveCharacterTextSplitter();

    // Split the document using the splitter instance and return the result
    return await splitter.splitDocuments([
      new Document({
        pageContent,
        metadata: {
          // Preserve the page number from the original metadata
          pageNumber: metadata.loc.pageNumber,
          // Truncate the page content to a maximum of 36000 bytes and include it in the metadata
          text: this.truncateStringByBytes(pageContent, 36000),
        },
      }),
    ]);
  }
}
