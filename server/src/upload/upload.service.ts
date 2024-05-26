import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable, PassThrough } from 'stream';
@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private fileKeys: string[] = []; // Array to store file keys

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
    });
    this.bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
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

    this.fileKeys.push(uniqueFileName); // Store the file key
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
  async downloadFromS3(fileKey: string): Promise<Readable> {
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    const obj = await this.s3Client.send(new GetObjectCommand(params));

    if (obj.Body instanceof Readable) {
      const fileStream = obj.Body;
      const tempFilePassThrough = new PassThrough();

      fileStream.pipe(tempFilePassThrough);

      return tempFilePassThrough;
    } else {
      throw new Error('Invalid response body');
    }
  }
}
