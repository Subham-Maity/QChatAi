import React from "react";
import { Card } from "@nextui-org/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/shadcn/resizable";
import { Skeleton } from "@nextui-org/skeleton";
const Layout = () => {
  return (
    <div>
      <Card className="h-full rounded-lg border">
        <ResizablePanelGroup
          className="bg-stone-300 dark:bg-stone-900"
          direction="horizontal"
        >
          <Skeleton>
            <ResizablePanel defaultSize={25}>
              <div className="flex h-screen w-72 items-center justify-center p-6"></div>
            </ResizablePanel>
          </Skeleton>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <Skeleton>
              <div className="flex h-screen w-72 items-center justify-center p-6"></div>
            </Skeleton>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </div>
  );
};

export default Layout;
