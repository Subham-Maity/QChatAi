import React from "react";
import { ThemeSwitch } from "@/components/theme/theme-switch";
import { TopNavProps } from "@/components/chat/types/chat.types";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import ChatSideBar from "@/components/chat/sidenav/sidebar";
import { Github, Menu } from "lucide-react";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { UserButton } from "@clerk/nextjs";
const TopNav: React.FC<TopNavProps> = ({ chatId, chats }) => {
  return (
    <nav className="bg-stone-200 dark:bg-stone-800 w-full z-20 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen flex flex-wrap justify-between mx-auto p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="text-black hover:text-stone-400 dark:text-gray-500 dark:hover:text-white" />
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="bg-stone-200 dark:bg-stone-800"
          >
            <ChatSideBar chatId={chatId ?? "0"} chats={chats} />
          </SheetContent>
        </Sheet>
        <div className="flex gap-4 items-center">
          <Link href="https://github.com/Subham-Maity/QChatAi">
            <Tooltip content={"Guide"} placement={"top"}>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                QChatAi
              </h1>
            </Tooltip>
          </Link>

          <Link href="https://github.com/Subham-Maity">
            <Tooltip content={"Creator"} placement={"top"}>
              <Github className="mr-2 w-6 h-6" />
            </Tooltip>
          </Link>
          <UserButton afterSignOutUrl="/" />
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
