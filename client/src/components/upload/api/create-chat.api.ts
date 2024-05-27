import createAxiosInstance from "@/hook/axios/axios";
import { backend_create_chat_path } from "@/links/backend-path-link.constant";

const axios = createAxiosInstance(0);

interface CreateChatRequestData {
  userId: string;
  fileUrl: string;
  fileKey: string;
  fileName: string;
}

export const createChat = async (data: CreateChatRequestData) => {
  try {
    const response = await axios.post(backend_create_chat_path, data);
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};
