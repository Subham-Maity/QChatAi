import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import createAxiosInstance from "@/hook/axios/axios";

export const runtime = "edge";
const axios = createAxiosInstance(0);
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();

    //TODO: Need to implement in the backend for getting the fileKey by chatId
    const lastMessage = messages[messages.length - 1];
    // Call the NestJS backend to get the context
    const contextResponse = await axios.post(
      `/context/get-context`,
      {
        query: lastMessage.content, //fileKey
      },
      { withCredentials: true },
    );

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {}
}
