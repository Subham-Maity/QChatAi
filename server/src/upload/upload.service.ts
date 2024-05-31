import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as fs from 'node:fs';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly s3: S3;
  private readonly bucketName: string;
  private fileKeys: string[] = [];

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
    this.s3 = new S3({
      region: this.configService.get<string>('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }

  async upload(fileName: string, file: Buffer): Promise<string> {
    const uniqueFileName = `uploads/${Date.now().toString()}-${fileName.replace(
      ' ',
      '-',
    )}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: uniqueFileName,
        Body: file,
      }),
    );

    this.fileKeys.push(uniqueFileName);
    return uniqueFileName;
  }

  async getS3Url(fileKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }

  async deleteFile(fileKey: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      }),
    );

    this.fileKeys = this.fileKeys.filter((key) => key !== fileKey);
  }

  getFileKeys(): string[] {
    return this.fileKeys;
  }
  async downloadFromS3(fileKey: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = {
          Bucket: this.bucketName,
          Key: fileKey,
        };

        const obj = await this.s3.send(new GetObjectCommand(params));
        const fileName = `../server/temp-s3/elliott${Date.now().toString()}.pdf`;

        if (obj.Body instanceof Readable) {
          const file = fs.createWriteStream(fileName);
          file.on('open', () => {
            (obj.Body as Readable).pipe(file).on('finish', () => {
              resolve(fileName);
            });
          });
          file.on('error', (error) => {
            reject(error);
          });
        } else {
          reject(new Error('Object body is not a readable stream'));
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}
