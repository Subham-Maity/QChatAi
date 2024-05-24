import axios_, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BASE_URLS } from "@/links/base-url-link.constant";

function createAxiosInstance(baseUrlIndex: number): AxiosInstance {
  const axios = axios_.create({
    baseURL: BASE_URLS[baseUrlIndex],
    withCredentials: true,
  });

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: any) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage =
          error.response.data.message.message ||
          error.response.data.message ||
          "An error occurred";
        return Promise.reject(new Error(errorMessage));
      } else if (error.response) {
        console.error(
          `Response error: ${error.response.status} ${error.response.data}`,
        );
      } else if (error.request) {
        console.error(`Request error: ${error.request}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
      return Promise.reject(error);
    },
  );

  return axios;
}

export default createAxiosInstance;
