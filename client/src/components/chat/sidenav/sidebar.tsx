"use client";
import Link from "next/link";
import React from "react";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn/button";
import { Chat } from "../types/chat.types";

const ChatSideBar = ({
  currentChat,
  chatId,
}: {
  currentChat: Chat;
  chatId: string;
}) => {
  return (
    <div className="w-full max-h-screen overflow-scroll soff p-4 text-gray-200 bg-gray-900 h-screen">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex max-h-screen overflow-scroll pb-20 flex-col gap-2 mt-4">
        {currentChat && (
          <Link key={currentChat.id} href={`/chat/${currentChat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-white":
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
