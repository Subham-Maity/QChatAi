"use client";
import React from "react";
import { columns } from "@/components/dash/_dash-chat/column/columns";
import { DataTable } from "@/components/ui/custom/data-table";
import { Card } from "@nextui-org/react";
import TopNav from "@/components/dash/_dash-chat/nav/top-nav";
import { useQuery } from "react-query";
import { getChats } from "@/components/chat/api/get-chats.api";
import { DataTableSkeleton } from "@/loader/data-table-skeleton";
const DashLayout = ({ userId }: { userId: string }) => {
  const { data: chats, isLoading: isLoadingChats } = useQuery(
    ["chats", userId],
    () => getChats(userId),
    {
      enabled: !!userId,
    },
  );
  return (
    <div className="flex flex-col h-screen gap-5">
      <TopNav chats={chats} />
      <Card className="container mx-auto px-0 py-0 default-bg">
        {isLoadingChats ? (
          <DataTableSkeleton
            columnCount={4}
            withPagination={false}
            searchableColumnCount={0}
            filterableColumnCount={0}
            cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
            shrinkZero={true}
          />
        ) : (
          <>
            <DataTable columns={columns} data={chats || []} />
          </>
        )}
      </Card>
    </div>
  );
};

export default DashLayout;
