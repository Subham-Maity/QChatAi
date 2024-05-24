// settings.ts
import { UseQueryOptions } from "react-query";

export const queryOptions: UseQueryOptions = {
  keepPreviousData: true, //keep the previous data when fetching new data
  staleTime: 300000, //5 minutes later, the data will be considered stale and fetched
  cacheTime: 1800000, //30 minutes later, the data will be removed from the cache
  onSuccess: () => {},
  refetchOnMount: false, //component is mounted for the first time
  refetchOnReconnect: true, //internet connection is back
  refetchOnWindowFocus: true, //tab is focused again
};
