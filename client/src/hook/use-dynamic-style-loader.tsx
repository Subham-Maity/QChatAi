"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const DynamicStyleLoader = () => {
  const pathname = usePathname();

  useEffect(() => {
    const loadStyle = async () => {
      if (pathname === "/") {
        await import("../../style/landing.css" as string);
      } else {
        await import("../../style/globals.css" as string);
      }
    };
    loadStyle().then((r) => console.log(r + "This the hook for CSS"));
  }, [pathname]);

  return null;
};

export default DynamicStyleLoader;
