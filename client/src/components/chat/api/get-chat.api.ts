import createAxiosInstance from "@/hook/axios/axios";
import { backend_get_chat_path } from "@/links/backend-path-link.constant";

const axios = createAxiosInstance(0);

export const getChat = async (
  userId: string | null | undefined,
  chatId: string | null | undefined,
) => {
  try {
    const response = await axios.get(
      `${backend_get_chat_path}/${userId || ""}/${chatId || ""}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error getting chat:", error);
    throw error;
  }
};
