import createAxiosInstance from "@/hook/axios/axios";
import { backend_create_chat_path } from "@/links/backend-path-link.constant";
import { CreateChatRequestData } from "@/components/start/types/file-upload.types";

const axios = createAxiosInstance(0);

export const createChat = async (data: CreateChatRequestData) => {
  console.log(JSON.stringify(data) + "Form Data");

  try {
    const response = await axios.post(backend_create_chat_path, data);
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};
