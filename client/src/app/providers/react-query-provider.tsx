"use client";
import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/hook/tanstack/react-query";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
