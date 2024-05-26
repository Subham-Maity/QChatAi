import { Injectable } from '@nestjs/common';
import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';

import { ConfigService } from '@nestjs/config';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import {
  Document,
  RecursiveCharacterTextSplitter,
} from '@pinecone-database/doc-splitter';
import md5 from 'md5';
import { UploadService } from '../../upload';

import { Configuration, OpenAIApi } from 'openai-edge';

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};
@Injectable()
export class PineconeService {
  private readonly pineconeClient: Pinecone;
  private openai: OpenAIApi;

  constructor(
    private readonly uploadService: UploadService,
    private configService: ConfigService,
  ) {
    const pineConeApiKey: string = this.configService.get('PINECONE_API_KEY');
    this.pineconeClient = new Pinecone({
      apiKey: pineConeApiKey,
    });

    const config = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(config);
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
    // 2. Text segmentation
    const documentArrays: Document[][] = await Promise.all(
      page.map((p) => this.prepareDocument(p)),
    );
    const documents: Document[] = documentArrays.flat();

    // 3. vectorised and embed individual documents
    const vectors = await Promise.all(documents.map(this.embedDocument));
    // // 3. vectorised and embed individual documents -
    // //transforming individual documents from a text format into a numerical representation
    // const vectors = await Promise.all(documents.flat().map(this.embedDocument));
    //
    // return vectors;
  }

  /**3. Vectorised and embed individual documents
   *
   *
   *
   */
  private async getEmbeddings(text: string) {
    try {
      const response = await this.openai.createEmbedding({
        model: 'text-embedding-3-small',
        input: text.replace(/\n/g, ' '),
      });
      const result = await response.json();
      return result.data[0].embedding as number[];
    } catch (error) {
      console.error('Error getting embeddings:', error);
      throw error;
    }
  }

  private async embedDocument(doc: Document): Promise<PineconeRecord> {
    try {
      const embeddings = await this.getEmbeddings(doc.pageContent);
      console.log('embeddings', embeddings);
      const hash = md5(doc.pageContent);

      return {
        id: hash,
        values: embeddings,
        metadata: {
          text: doc.metadata.text,
          pageNumber: doc.metadata.pageNumber,
        },
      } as PineconeRecord;
    } catch (error) {
      console.log('error embedding document', error);
      throw error;
    }
  }

  /**2. Text segmentation
   *
   *
   *
   */
  // Purpose:  Truncate a string to a specified number of bytes,
  // ensuring that the resulting string does not exceed the given byte limit.
  private truncateStringByBytes(str: string, bytes: number): string {
    // Encode the string as a Uint8Array
    const enc = new TextEncoder();
    // Encode the string, slice it to the specified number of bytes,
    // then decode it back to a string and return it
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
  }

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
