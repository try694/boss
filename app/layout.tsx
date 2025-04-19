// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Amazing Trading",
  description: `Discover the future of arbitrage. Seamlessly optimize your trades and get ahead with real‑time tools built for modern finance.`,
  icons: {
    icon: "/favicon.ico",            // your favicon in public/favicon.ico
    shortcut: "/favicon.ico",        // legacy fallback
    apple: "/apple-touch-icon.png",  // optional iOS icon
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="bg-gray-900 poppins-regular">
          {children}
          <ToastContainer autoClose={2000} />
        </body>
      </html>
    </SessionProvider>
  );
}
