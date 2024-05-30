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
import {
  convertToAscii,
  pinecone_client_index_name,
  truncateStringByBytes,
} from '../../common';
import { unlink } from 'node:fs/promises';
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
    // 1. Extract text from the PDF
    const filePath: string = await this.uploadService.downloadFromS3(fileKey);
    if (!filePath) {
      throw new Error('Could not download from S3');
    }

    try {
      const pdf_loader = new PDFLoader(filePath);
      const pages: PDFPage[] = (await pdf_loader.load()) as PDFPage[];

      // 2. Split and segment the PDF
      const documents = await Promise.all(pages.map(this.prepareDocument));

      // 3. Vectorize and embed individual documents
      const vectors = await Promise.all(
        documents.flat().map(this.embedDocument),
      );

      // 4. Upload vectorized documents to Pinecone
      const pineconeIndex = this.pineconeClient.index(
        pinecone_client_index_name,
      );
      // Need to convert fileKey to ASCII to avoid errors in Pinecone
      const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
      await namespace.upsert(vectors);

      return documents[0];
    } finally {
      // Ensure the temporary file is deleted after processing
      await unlink(filePath).catch((err) =>
        console.error('Failed to delete temp file:', err),
      );
    }
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
