import { backend_upload_path } from "@/links/backend-path-link.constant";
import createAxiosInstance from "@/hook/axios/axios";

const axios = createAxiosInstance(0);

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(backend_upload_path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(JSON.stringify(response.data) + "Response Data");
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
