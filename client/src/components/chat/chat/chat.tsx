import React from "react";
import { Send } from "lucide-react";
import MessageList from "@/components/chat/chat/list/message-list";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { HoverBorderGradient } from "@/components/ui/aceternity/hover-border-gradient";

const Chat = ({ chatId }: { chatId: string }) => {
  return (
    <div>
      <MessageList messages={[]} isLoading={false} />

      <form
      // onSubmit={handleSubmit}
      >
        <div className="grid  mx-6 gap-2">
          <Textarea
            className="px-2 bg-stone-100 dark:bg-stone-700"
            placeholder="Type your message here."
          />
          <div className="text-center">
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
