import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import ChatSideBar from "@/app/layout/nav/sidenav/sidebar";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        <div className="flex-[1] max-w-xs">
          <ChatSideBar userId={userId} />
        </div>
        {/* pdf viewer */}
        <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
          {/*<PDFViewer pdf_url={currentChat?.pdfUrl || ""} />*/}
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          {/*<ChatComponent chatId={parseInt(chatId)} />*/}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
