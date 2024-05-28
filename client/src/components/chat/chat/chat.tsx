import React from "react";
import { Send } from "lucide-react";
import MessageList from "@/components/chat/chat/list/message-list";
import { HoverBorderGradient } from "@/components/ui/aceternity/hover-border-gradient";
import { useChat } from "ai/react";
import { Textarea } from "@/components/ui/shadcn/textarea";
const Chat = ({ chatId }: { chatId: string }) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat-with-user",
  });
  return (
    <div>
      <MessageList messages={messages} />

      <form onSubmit={handleSubmit}>
        <div className="grid  mx-6 gap-2">
          <Textarea
            value={input}
            onChange={handleInputChange}
            className="px-2 bg-stone-100 dark:bg-stone-700"
            placeholder="Ask me anything about your PDF.."
          />
          <div className="text-center mb-4">
            <HoverBorderGradient
              containerClassName="rounded-lg "
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <button className="flex gap-2">
                <span> Send</span>
                <Send className="h-4 w-4 mt-0.5" />
              </button>
            </HoverBorderGradient>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;
