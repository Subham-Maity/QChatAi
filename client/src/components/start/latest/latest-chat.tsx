"use client";
import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { getLatestChat } from "@/components/start/api/get-latest-chat";
import { Button, Skeleton } from "@nextui-org/react";

interface Props {
  userId: string | null;
}
const LatestChat: React.FC<Props> = ({ userId }) => {
  const router = useRouter();

  const { data: latestChat, isLoading } = useQuery(["latestChat", userId], () =>
    getLatestChat(userId),
  );

  if (!latestChat) {
    return null;
  }

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
    <div>
      {latestChat && (
        <Button
          className="w-full"
          onClick={() => router.push(`/chat/${latestChat.id}`)}
        >
          View Latest Chat
        </Button>
      )}
    </div>
  );
};

export default LatestChat;
