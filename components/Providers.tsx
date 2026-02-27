"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            borderRadius: "12px",
            fontSize: "14px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#14b8a6",
              secondary: "#f1f5f9",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#f1f5f9",
            },
          },
        }}
      />
    </SessionProvider>
  );
}
