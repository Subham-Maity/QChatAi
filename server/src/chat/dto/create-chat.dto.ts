import { IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  userId: string;

  @IsString()
  fileUrl: string;

  @IsString()
  fileKey: string;

  @IsString()
  fileName: string;
}
