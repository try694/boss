import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react'
import { auth } from "@/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Create",
  description: "Generatep",
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