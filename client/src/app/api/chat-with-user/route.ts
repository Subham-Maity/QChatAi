import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import createAxiosInstance from "@/hook/axios/axios";
import { NextResponse } from "next/server";

export const runtime = "edge";
const axios = createAxiosInstance(0);
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    // Call the NestJS backend to get the chat details
    const chatResponse = await axios.get(`/chat/${chatId}`);
    const chat = chatResponse.data;

    if (!chat) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }

    const fileKey = chat.fileKey;

    console.log(fileKey + "fileKey");

    const lastMessage = messages[messages.length - 1];
    // Call the NestJS backend to get the context
    const contextResponse = await axios.post(`/context/get-context`, {
      query: lastMessage.content,
      fileKey,
    });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {}
}
