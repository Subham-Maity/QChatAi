import createAxiosInstance from "@/hook/axios/axios";
import { backend_get_chats_path } from "@/links/backend-path-link.constant";

const axios = createAxiosInstance(0);

export const getChats = async (userId: string) => {
  try {
    const response = await axios.get(`${backend_get_chats_path}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting chats:", error);
    throw error;
  }
};
