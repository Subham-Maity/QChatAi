import { Injectable } from '@nestjs/common';
import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import {
  Document,
  RecursiveCharacterTextSplitter,
} from '@pinecone-database/doc-splitter';
import { UploadService } from '../../upload';
import { OpenaiService } from '../../openai';
import { convertToAscii, truncateStringByBytes } from '../utils';

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
    private openai: OpenaiService,
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
    const pages: PDFPage[] = (await pdf_loader.load()) as PDFPage[];

    // 2. split and segment the pdf
    const documents = await Promise.all(pages.map(this.prepareDocument));

    // 3. vectorised and embed individual documents -
    //transforming individual documents from a text format into a numerical representation
    const vectors = await Promise.all(documents.flat().map(this.embedDocument));

    // 4. Upload vectorized documents to Pinecone
    const pineconeIndex = this.pineconeClient.index('pdf-chat');
    //Need to convert fileKey to ascii to avoid errors in Pinecone
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
    await namespace.upsert(vectors);

    return documents[0];
  }

  /**3. Vectorised and embed individual documents
   *
   *
   *
   */
  private embedDocument = async (doc: Document) => {
    const embeddings = await this.openai.getEmbeddings(doc.pageContent);
    const hash = crypto.createHash('md5').update(doc.pageContent).digest('hex');
    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  };

  /**2. Text segmentation
   *
   *
   *
   */
  //Prepare a document for further processing by cleaning its content (removing newline characters) and
  // splitting it into smaller parts using a text splitter.
  private async prepareDocument(page: PDFPage) {
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
          text: truncateStringByBytes(pageContent, 36000),
        },
      }),
    ]);
  }
}
