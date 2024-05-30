import createAxiosInstance from "@/hook/axios/axios";
import { backend_get_signed_url_path } from "@/links/backend-path-link.constant";

const axios = createAxiosInstance(0);

export const getSignedUrl = async (fileKey: string) => {
  try {
    const response = await axios.post(backend_get_signed_url_path, { fileKey });
    return response.data.fileUrl;
  } catch (error) {
    console.error("Error fetching signed URL:", error);
    throw error;
  }
};
