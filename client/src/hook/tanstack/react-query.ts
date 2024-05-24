import { QueryClient } from "react-query";
import { queryOptions } from "@/hook/tanstack/setting";

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: queryOptions,
  },
});
