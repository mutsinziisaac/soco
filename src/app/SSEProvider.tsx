// app/SSEProvider.jsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startOrderSSE } from "@/lib/slices/orderSSE"; // adjust path as needed

const SSEProvider = () => {
  const dispatch = useDispatch();

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
