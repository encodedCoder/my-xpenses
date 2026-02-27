import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://my-xpenses.vercel.app"),
  title: "My Expenses — Smart Expense Tracker",
  description:
    "Track, analyze, and manage your daily expenses with a beautiful mobile-first experience. Powered by modern fintech design.",
  keywords: ["expense tracker", "money manager", "personal finance", "budget"],
  authors: [{ name: "Expense App" }],
  appleWebApp: {
    title: "myExpenses",
    statusBarStyle: "default",
    capable: true,
  },
  openGraph: {
    title: "My Expenses — Smart Expense Tracker",
    description:
      "Track, analyze, and manage your daily expenses with a beautiful mobile-first experience. Powered by modern fintech design. Take control of your finances today.",
    url: "https://my-xpenses.vercel.app",
    siteName: "My Expenses",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "My Expenses — Smart Expense Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Expenses — Smart Expense Tracker",
    description:
      "Track, analyze, and manage your daily expenses with a beautiful mobile-first experience. Powered by modern fintech design. Take control of your finances today.",
    creator: "@encodedcoder_",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
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
