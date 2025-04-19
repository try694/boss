"use client";

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { UserButton } from "@/components/auth/user-button";
import { motion } from "framer-motion";
import Navbar from "./_components/navbar";
import type { User } from "@prisma/client";

interface ClientDashboardLayoutProps {
  children: React.ReactNode;
  user: Pick<User, "id" | "username" | "firstname" | "lastname">;
}

export default function ClientDashboardLayout({
  children,
  user,
}: ClientDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((o) => !o);
  const SIDEBAR_WIDTH = 240;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900 h-14 flex items-center justify-between px-4">
        {/* Hamburger Menu */}
        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white p-2"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Centered Logo */}
        <img src="/logo.png" alt="Logo" className="w-16 h-auto" />

        {/* User Section */}
        <div className="flex items-center space-x-3">
          <span className="text-sm md:text-base text-gray-300">
            {user.username}
          </span>
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

      {/* Main Content */}
      <div
        className="transition-all duration-300 flex-1 pt-4 px-4 md:px-6"
        style={{
          marginLeft:
            sidebarOpen && window.innerWidth >= 768
              ? `${SIDEBAR_WIDTH}px`
              : 0,
        }}
      >
        <main className="mx-auto max-w-[1800px] bg-gray-800/30 rounded-xl shadow-xl min-h-[calc(100vh-56px)] overflow-x-auto">
          {children ?? (
            <div className="p-6 text-gray-400">No content available</div>
          )}
        </main>
      </div>
    </div>
  );
}