"use client";

import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export function ConditionalNextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRootPath = pathname === "/";

  if (isRootPath) {
    return <>{children}</>;
  }

  return <NextUIProvider>{children}</NextUIProvider>;
}
