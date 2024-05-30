export interface ChatI {
  title: string;
  description: string;
  id: number;
  pdfName: string;
  createdAt: string;
  userId: string;
  fileKey: string;
}
export interface TopNavProps {
  chatId: string;
  chats: ChatI[] | undefined;
}
export interface ChatSideBarProps {
  chatId: string;
  chats: ChatI[] | undefined; // Add the chats prop
}
