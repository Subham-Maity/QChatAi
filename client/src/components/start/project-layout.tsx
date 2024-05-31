import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/start/upload/file-upload";
import { Form } from "@/components/start/form/form";
import LatestChat from "@/components/start/latest/latest-chat";

const ProjectLayout = ({ userId }: { userId: string }) => {
  const isAuth = !!userId;

  console.log(userId, "userId");
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-full mt-4">
        {isAuth ? (
          <>
            <div className="flex flex-col max-w-md w-full gap-4 rounded-none md:rounded-2xl p-4 shadow-input bg-stone-300 dark:bg-stone-700/40">
              <Form />
              <FileUpload userId={userId} />
              {/*<LatestChat userId={userId} />*/}
            </div>
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <Button className="default-button">
                Login to get Started!
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectLayout;
