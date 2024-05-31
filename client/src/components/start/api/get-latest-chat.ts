import createAxiosInstance from "@/hook/axios/axios";
import { backend_get_latest_chat_path } from "@/links/backend-path-link.constant";

const axios = createAxiosInstance(0);

export const getLatestChat = async (userId: string | null | undefined) => {
  try {
    const response = await axios.get(
      `${backend_get_latest_chat_path}/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error getting latest chat:", error);
    throw error;
  }
};
