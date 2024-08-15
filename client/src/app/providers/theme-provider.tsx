"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { usePathname } from "next/navigation";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();
  const isRootPath = pathname === "/";

  return (
    <NextThemesProvider
      {...props}
      forcedTheme={isRootPath ? "light" : undefined}
    >
      {children}
    </NextThemesProvider>
  );
}
