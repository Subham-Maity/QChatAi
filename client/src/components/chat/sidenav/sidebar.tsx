"use client";
import Link from "next/link";
import React from "react";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn/button";
import { ChatI } from "../types/chat.types";

const ChatSideBar = ({
  currentChat,
  chatId,
}: {
  currentChat: ChatI;
  chatId: string;
}) => {
  return (
    <div className="w-full max-h-screen overflow-scroll soff text-gray-200 h-screen">
      <Link href="/">
        <Button className="w-full border-dashed border-stone-200 dark:border-stone-800 border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex max-h-screen pb-20 flex-col gap-2 mt-4">
        {currentChat && (
          <Link key={currentChat.id} href={`/chat/${currentChat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "dark:bg-stone-600 bg-white dark:text-white text-black":
                  currentChat.id === parseInt(chatId ?? "0"),
                "hover:text-white": currentChat.id !== parseInt(chatId ?? "0"),
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {currentChat.pdfName}
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ChatSideBar;
