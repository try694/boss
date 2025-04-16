"use client";

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { UserButton } from "@/components/auth/user-button";
import Navbar from "./_components/navbar";
import { motion } from "framer-motion";
import useSWR from "swr";
import { getApprovedUsers } from "@/actions/waitinglist-action";
import { IUser } from "@/interface";

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fetch approved users
  const { data: approvedUsers } = useSWR<IUser[]>("/approveduser", getApprovedUsers);

  // Instead of fetching the first name, we now grab the username
  const currentUsername =
    approvedUsers && approvedUsers.length > 0 ? approvedUsers[0].username : "";

  const SIDEBAR_WIDTH = 240;

  return (
    <div className="min-h-screen mt-4 text-white relative bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-[100] bg-gray-900 h-14 flex items-center px-4 md:px-6">
        {/* Left: Toggle Button */}
        <div className="flex-1 flex items-center justify-start">
          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white p-2 z-[9999]"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex-1 mt-4 flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="w-16 h-auto" />
        </div>

        {/* Right: User */}
        <div className="flex-1 flex items-center justify-end">
          {currentUsername && (
            <span className="mr-2 text-sm md:text-base text-gray-300">
              {currentUsername}
            </span>
          )}
          <UserButton />
        </div>
      </header>

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 z-40"
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -SIDEBAR_WIDTH }}
        transition={{ duration: 0.3 }}
        style={{ width: SIDEBAR_WIDTH, height: "100vh" }}
      >
        <Navbar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </motion.div>

      {/* Main content area that shifts with sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out pt-4 px-4 md:px-6 flex-1`}
        style={{
          marginLeft:
            sidebarOpen &&
            typeof window !== "undefined" &&
            window.innerWidth >= 768
              ? `${SIDEBAR_WIDTH}px`
              : "0px",
        }}
      >
        <main className="w-full max-w-[1800px] mx-auto bg-gray-800/30 rounded-xl shadow-xl min-h-[calc(100vh-56px)] overflow-x-auto">
          {children || (
            <div className="p-6 text-gray-400">No content available</div>
          )}
        </main>
      </div>
    </div>
  );
}
