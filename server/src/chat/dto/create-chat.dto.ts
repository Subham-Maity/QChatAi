import { IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  title: string;
  @IsString()
  description: string;

  @IsString()
  userId: string;

  @IsString()
  fileUrl: string;

  @IsString()
  fileKey: string;

  @IsString()
  fileName: string;
}
