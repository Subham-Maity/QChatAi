import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileKey = await this.uploadService.upload(
      file.originalname,
      file.buffer,
    );
    const fileUrl = await this.uploadService.getS3Url(fileKey);
    return { fileUrl, fileKey, fileName: file.originalname };
  }

  @Get('signed-url')
  async getSignedUrl(@Body('fileKey') fileKey: string) {
    const fileUrl = await this.uploadService.getS3Url(fileKey);
    return { fileUrl };
  }

  @Delete()
  async deleteFile(@Body('fileKey') fileKey: string) {
    await this.uploadService.deleteFile(fileKey);
    return { message: 'File deleted successfully' };
  }

  @Get('file-keys')
  getFileKeys() {
    const fileKeys = this.uploadService.getFileKeys();
    return { fileKeys };
  }
}
