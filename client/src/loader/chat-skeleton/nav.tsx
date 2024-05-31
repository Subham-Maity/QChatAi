import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
const TopNav = () => {
  return (
    <Skeleton className="border-b-gray-500 border-b-1">
      <nav className="bg-stone-200 dark:bg-stone-800 w-full z-20 border-b border-gray-200 h-16 dark:border-gray-600">
        <div className="max-w-screen flex flex-wrap justify-between mx-auto p-4"></div>
      </nav>
    </Skeleton>
  );
};

export default TopNav;
