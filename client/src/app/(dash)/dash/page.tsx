import React from "react";
import DashLayout from "@/components/dash/_dash-chat/dash-layout";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashPage = () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }
  return (
    <div>
      <DashLayout userId={userId} />
    </div>
  );
};

export default DashPage;
