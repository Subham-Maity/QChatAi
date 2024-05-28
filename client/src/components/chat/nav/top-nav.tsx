import React from "react";
import { ThemeSwitch } from "@/components/theme/theme-switch";
import { ChatI } from "@/components/chat/types/chat.types";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { Button } from "@/components/ui/shadcn/button";
import ChatSideBar from "@/components/chat/sidenav/sidebar";

const TopNav = ({
  currentChat,
  chatId,
}: {
  currentChat: ChatI;
  chatId: string;
}) => {
  return (
    <nav className="bg-stone-200 dark:bg-stone-800 w-full z-20 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen flex flex-wrap justify-between mx-auto p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="bg-stone-200 dark:bg-stone-800"
          >
            <ChatSideBar currentChat={currentChat} chatId={chatId ?? "0"} />
          </SheetContent>
        </Sheet>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
