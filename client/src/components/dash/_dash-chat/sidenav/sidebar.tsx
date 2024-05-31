"use client";
import Link from "next/link";
import React from "react";
import { FilePlus2, FileText, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@nextui-org/tooltip";
import { HoverBorderGradient } from "@/components/ui/aceternity/hover-border-gradient";
interface ChatINav {
  title: string;
  description: string;
  id: number;
  pdfName: string;
  createdAt: string;
  userId: string;
  fileKey: string;
}

export interface ChatSideBar {
  chats: ChatINav[] | undefined;
}

const ChatSideBar = ({ chats }: ChatSideBar) => {
  return (
    <div className="w-full max-h-screen overflow-scroll soff text-gray-200 h-screen">
      <div className="flex items-center justify-between">
        <Link href="/start">
          <HoverBorderGradient
            containerClassName="rounded-lg "
            as="button"
            className="w-full dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <button className="w-full flex gap-2">
              <FilePlus2 className="mr-2 w-5 h-5" />
              Add New
            </button>
          </HoverBorderGradient>
        </Link>
      </div>

      <div className="text-center mb-4"></div>
      <div className="flex max-h-screen pb-20 flex-col gap-2 mt-4">
        {chats && chats.length > 0 ? (
          chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div
                className={cn(
                  "rounded-lg p-3 text-stone-500 flex items-center",
                )}
              >
                <FileText className="mr-2" />
                <Tooltip
                  content={`${chat.pdfName}- ${chat.description}`}
                  placement={"right"}
                >
                  <p className="w-full overflow-hidden text-sm  truncate whitespace-nowrap text-ellipsis">
                    {chat.title}
                  </p>
                </Tooltip>
              </div>
            </Link>
          ))
        ) : (
          <p>No chats found.</p>
        )}
      </div>
    </div>
  );
};

export default ChatSideBar;
