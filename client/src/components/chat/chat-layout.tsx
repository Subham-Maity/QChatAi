"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import { getChat } from "@/components/chat/api/get-chat.api";
import PDFViewer from "@/components/chat/view/pdf-view";
import Chat from "@/components/chat/chat/chat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/shadcn/resizable";
import TopNav from "@/components/chat/nav/top-nav";
import { Card } from "@/components/ui/shadcn/card";
import { getChats } from "@/components/chat/api/get-chats.api";

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
  const { data: chats, isLoading: isLoadingChats } = useQuery(
    ["chats", userId],
    () => getChats(userId),
    {
      enabled: !!userId,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col h-screen">
      <TopNav chatId={chatId ?? "0"} chats={chats} />
      <div className="flex-grow overflow-auto">
        <Card className="h-full rounded-lg border">
          <ResizablePanelGroup
            className="bg-stone-300 dark:bg-stone-900"
            direction="horizontal"
          >
            <ResizablePanel defaultSize={25}>
              <div className="relative flex h-full w-full ">
                <div className="absolute bottom-0 left-0 right-0">
                  <Chat chatId={chatId ?? "0"} />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <PDFViewer pdf_url={currentChat?.pdfUrl} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Card>
      </div>
    </div>
  );
};

export default ChatLayout;
