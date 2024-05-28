import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/shadcn/card";

type Props = {
  messages: Message[];
};

const MessageList = ({ messages }: Props) => {
  if (!messages) return <></>;
  return (
    <Card className="mx-6 mb-1 dark:bg-stone-700 bg-white">
      <CardContent className="px-2 py-1">
        <div className="flex flex-col gap-2 mb-4 mt-4">
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className={cn("flex", {
                  "justify-end pl-10": message.role === "user",
                  "justify-start pr-10": message.role === "assistant",
                })}
              >
                <div
                  className={cn(
                    "rounded-lg px-3 text-sm py-1 shadow-md ring-1 dark:ring-gray-300/15 ring-gray-900/10 mb-4",
                    {
                      "dark:bg-stone-900/80 bg-white dark:text-white text-black":
                        message.role === "user",
                    },
                  )}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageList;
