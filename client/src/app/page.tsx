import React from "react";
import HomeLayout from "@/components/hero/home-layout";

const Page = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <HomeLayout />
      </div>
    </main>
  );
};

export default Page;
