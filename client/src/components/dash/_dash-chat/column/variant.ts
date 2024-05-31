import { ChatStatus } from "@/components/dash/_dash-chat/types/status.types";

export const getBadgeVariant = (status: ChatStatus) => {
  switch (status) {
    case "creating":
      return "outline";
    case "failed":
      return "destructive";
    case "created":
      return "secondary";
    default:
      return "default";
  }
};
