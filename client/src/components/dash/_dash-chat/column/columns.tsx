import { Badge } from "@/components/ui/shadcn/badge";
import { ColumnDef } from "@tanstack/react-table";
import { ChatStatus } from "@/components/dash/_dash-chat/types/status.types";
import { getBadgeVariant } from "@/components/dash/_dash-chat/column/variant";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      return <Badge variant="default">{id}</Badge>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const name: string = row.getValue("title");
      const description: string = row.original.description;
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-black text-white font-bold capitalize w-8 h-8 rounded-full">
            {name[0]}
          </div>
          <div className="grid">
            <span className="font-medium">{name}</span>
            <span className="text-xs text-neutral-500">{description}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "pdfName",
    header: "Pdf Name",
    cell: ({ row }) => {
      const pdf_name: number = row.getValue("pdfName");
      return <Badge variant="default">{pdf_name}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: ChatStatus = row.getValue("status");
      const variant = getBadgeVariant(status);
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      return <Badge variant="default">{createdAt}</Badge>;
    },
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      return (
        <Link href={`/chat/${id}`}>
          <Badge>View</Badge>
        </Link>
      );
    },
  },
];
