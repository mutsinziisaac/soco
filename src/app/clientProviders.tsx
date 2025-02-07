"use client";

import React from "react";
import StoreProvider from "./storeProvider";
import { Toaster } from "sonner";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <Toaster position="top-right" richColors />
      {children}
    </StoreProvider>
  );
}
