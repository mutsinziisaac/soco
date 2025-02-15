"use client";

import React from "react";
import StoreProvider from "./storeProvider";
import { Toaster } from "sonner";
import SSEProvider from "./SSEProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <Toaster position="top-right" richColors />
      <SSEProvider />
      {children}
    </StoreProvider>
  );
}
