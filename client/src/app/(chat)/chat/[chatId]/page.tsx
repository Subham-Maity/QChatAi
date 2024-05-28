import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import ChatLayout from "@/components/chat/chat-layout";

const ChatPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return <ChatLayout userId={userId} />;
};

export default ChatPage;
