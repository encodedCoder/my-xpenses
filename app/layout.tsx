import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "My Expenses — Smart Expense Tracker",
  description:
    "Track, analyze, and manage your daily expenses with a beautiful mobile-first experience. Powered by modern fintech design.",
  keywords: ["expense tracker", "money manager", "personal finance", "budget"],
  authors: [{ name: "Expense App" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
