import React from "react";
import { ThemeSwitch } from "@/components/theme/theme-switch";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { Github, Menu, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { UserButton } from "@clerk/nextjs";
import ChatSideBar from "@/components/dash/_dash-chat/sidenav/sidebar";
import { Button, Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getLatestChat } from "@/components/start/api/get-latest-chat";
export interface ChatI {
  title: string;
  description: string;
  id: number;
  pdfName: string;
  createdAt: string;
  userId: string;
  fileKey: string;
}
interface TopNavProps {
  chats: ChatI[] | undefined;
  userId: string | undefined;
}
const TopNav: React.FC<TopNavProps> = ({ chats, userId }) => {
  const router = useRouter();
  const { data: latestChat, isLoading } = useQuery(["latestChat", userId], () =>
    getLatestChat(userId),
  );
  if (isLoading) {
    return (
      <Skeleton>
        <div>
          <Button>View Latest Chat</Button>
        </div>
      </Skeleton>
    );
  }

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
            <ChatSideBar chats={chats} />
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
          <Tooltip content={"Latest Chat"} placement={"top"}>
            <Button
              color="primary"
              variant="faded"
              startContent={<MessageCircle />}
              onClick={() => router.push(`/chat/${latestChat.id}`)}
            >
              <h1 className="text-md font-bold text-gray-900 dark:text-white">
                View Latest Chat
              </h1>
            </Button>
          </Tooltip>
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
