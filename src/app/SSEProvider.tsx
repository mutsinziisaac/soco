// app/SSEProvider.jsx
"use client";

import { useEffect } from "react";
import { startOrderSSE } from "@/lib/slices/orderSSE"; // adjust path as needed
import { useAppDispatch } from "@/lib/hooks";

const SSEProvider = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Start the SSE subscription.
    const sseConnection = dispatch(startOrderSSE());

    // Cleanup the connection on unmount.
    return () => {
      if (sseConnection && sseConnection.close) {
        sseConnection.close();
      }
    };
  }, [dispatch]);

  return null; // This component doesn't render anything visible.
};

export default SSEProvider;
