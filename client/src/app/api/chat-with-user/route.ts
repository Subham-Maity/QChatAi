import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
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
      return NextResponse.json({ error: "Chat Not Found!" }, { status: 404 });
    }

    const fileKey = chat.fileKey;

    const lastMessage = messages[messages.length - 1];
    // Call the NestJS backend to get the context
    const contextResponse = await axios.post(`/context/get-context`, {
      query: lastMessage.content,
      fileKey,
    });

    const context = contextResponse.data;
    //Source: https://vercel.com/templates/next.js/pinecone-vercel-ai
    const prompt = {
      role: "system",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
         The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
         AI is a well-behaved and well-mannered individual.
         AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
         AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
         AI assistant is a big fan of Pinecone and Vercel.
         START CONTEXT BLOCK
         ${context}
         END OF CONTEXT BLOCK
         AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
         If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
         AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
         AI assistant will not invent anything that is not drawn directly from the context.
        `,
    };
    // Dubbugging Purpose

    // console.log(
    //   "API HIT ************* Chat Completion" + JSON.stringify(prompt),
    // );
    // console.log(context + "context-data");

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });
    const stream = OpenAIStream(response, {
      onStart: async () => {
        // Call the NestJS backend to save the user message
        await axios.post(`/chat/saveUserMessage`, {
          chatId,
          content: lastMessage.content,
        });
      },
      onCompletion: async (completion) => {
        // Call the NestJS backend to save the AI message
        await axios.post(`/chat/saveAIMessage`, {
          chatId,
          content: completion,
        });
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {}
}
