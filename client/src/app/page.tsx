import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/upload/file-upload";

export default async function Home() {
  const { userId } = auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black flex justify-center items-center gap-2">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold text-white">
              Chat with PDF
            </h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2">
            {isAuth && (
              <>
                <Link href={`/chat`}>
                  <Button className="default-button">
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </>
            )}
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Leverage the power of AI to instantly answer questions and gain
            insights from research.
          </p>
          <div className="w-full mt-4">
            {isAuth ? (
              <>
                {" "}
                <FileUpload userId={userId} />
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
      </div>
    </div>
  );
}
