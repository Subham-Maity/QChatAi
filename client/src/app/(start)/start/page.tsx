import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import ProjectLayout from "@/components/start/project-layout";

const StartPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return <ProjectLayout userId={userId} />;
};

export default StartPage;
