import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenaiService } from '../openai';
import { ConfigService } from '@nestjs/config';
import { convertToAscii, pinecone_client_index_name } from '../common';
import { Metadata } from './types';

@Injectable()
export class ContextService {
  private readonly pineconeClient: Pinecone;
  constructor(
    private readonly openaiService: OpenaiService,
    private configService: ConfigService,
  ) {
    const pineConeApiKey: string = this.configService.get('PINECONE_API_KEY');
    this.pineconeClient = new Pinecone({
      apiKey: pineConeApiKey,
    });
  }
  async getMatchesFromPinecone(embeddings: number[], fileKey: string) {
    try {
      const pineconeIndex = this.pineconeClient.index(
        pinecone_client_index_name,
      );
      const name_space = pineconeIndex.namespace(convertToAscii(fileKey));
      const queryResults = await name_space.query({
        topK: 5, //how many results to return (return top 5 similar vectors that matches the query)
        vector: embeddings, //The vector to compare against. This should be a list of floats.
        includeMetadata: true, //Whether to include the metadata of the vectors in the response.
      });
      return queryResults.matches || []; //it will return the top 5 squad vector
    } catch (error) {
      throw new InternalServerErrorException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }
  async getContext(questions: string, fileKey: string) {
    try {
      //We get the question embedding from openai
      const queryEmbeddings = await this.openaiService.getEmbeddings(questions);
      //We then use the question embedding to find the most relevant document from pinecone
      const matches = await this.getMatchesFromPinecone(
        queryEmbeddings,
        fileKey, // this is the file key of the document we want to retrieve
      );

      // We filter out the documents that have a similarity score greater than 70%
      // This helps to reduce noise and improve the quality of the context
      //If less than 70% similar, it's irrelevant, and we can filter it out
      const qualifyingDocs = matches.filter(
        (match) => match.score && match.score > 0.7,
      );

      // We then extract the text from the qualifying documents and
      // concatenate them into a single string
      const docs = qualifyingDocs.map(
        (match) => (match.metadata as Metadata).text,
      );
      // in case the context is too long, we only return the first 3000 characters
      // We can't fit the whole context in one response because it exceeds the maximum token limit
      return docs.join('\n').substring(0, 3000);
    } catch (error) {
      throw new InternalServerErrorException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }
}
