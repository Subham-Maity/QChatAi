import React from "react";
import TopNav from "@/loader/chat-skeleton/nav";

import Layout from "@/loader/chat-skeleton/layout";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex-grow overflow-auto">
        <Layout />
      </div>
    </div>
  );
};

export default ChatSkeleton;
