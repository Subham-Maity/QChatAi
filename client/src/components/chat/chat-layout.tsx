"use client";
import React from "react";
import ChatSideBar from "@/components/chat/sidenav/sidebar";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import { getChat } from "@/components/chat/api/get-chat.api";
import PDFViewer from "@/components/chat/view/pdf-view";

const ChatLayout = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  const chatId = pathname.split("/").pop();
  const enabled = !!userId && !!chatId;

  const { data: currentChat, isLoading } = useQuery(
    ["chat", userId, chatId],
    () => getChat(userId, chatId),
    {
      enabled,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        <div className="flex-[1] max-w-xs">
          <ChatSideBar currentChat={currentChat} chatId={chatId ?? "0"} />
        </div>
        <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
          <PDFViewer pdf_url={currentChat.pdfUrl} />
        </div>
        <div className="flex-[3] border-l-4 border-l-slate-200"></div>
      </div>
    </div>
  );
};

export default ChatLayout;
