import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../style/globals.css";
import { dark } from "@clerk/themes";
import React from "react";
import ReactQueryProvider from "@/app/providers/react-query-provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/app/providers/theme-provider";
import AuthGuard from "@/protected/auth-guard";
import { ReduxProvider } from "@/app/providers/redux-provider";
import { ClerkProvider } from "@clerk/nextjs";
import DynamicStyleLoader from "@/hook/use-dynamic-style-loader";
import { ConditionalNextUIProvider } from "@/hook/use-conditional-NextUIProvider";

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
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <html lang="en">
          <DynamicStyleLoader />
          <Toaster position="top-right" />
          <body
            className={`${inter.className} min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AuthGuard>
                <ReduxProvider>
                  <ConditionalNextUIProvider>
                    {children}
                  </ConditionalNextUIProvider>
                </ReduxProvider>
              </AuthGuard>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
