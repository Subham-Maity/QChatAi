export interface FileUploadProps {
  userId: string | null;
}
export interface CreateChatRequestData {
  title: string;
  description: string;
  userId: string;
  fileUrl: string;
  fileKey: string;
  fileName: string;
}
