import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import ReactQueryProvider from "@/app/providers/react-query-provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/app/providers/theme-provider";
import AuthGuard from "@/protected/auth-guard";
import { ReduxProvider } from "@/app/providers/redux-provider";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <ClerkProvider>
        <html lang="en">
          <Toaster position="top-right" />
          <body
            className={`${inter.className} dark:bg-gradient-to-r dark:from-stone-800 dark:via-stone-900 dark:to-black bg-gradient-to-r from-stone-200 via-stone-300 to-white`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AuthGuard>
                <ReduxProvider>
                  <NextUIProvider>{children}</NextUIProvider>
                </ReduxProvider>
              </AuthGuard>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
