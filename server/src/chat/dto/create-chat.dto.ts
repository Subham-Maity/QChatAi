import { IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  fileUrl: string;

  @IsString()
  fileKey: string;
}
