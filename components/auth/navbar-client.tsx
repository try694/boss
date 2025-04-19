// components/NavbarClient.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FiHome, FiBarChart2, FiUser } from "react-icons/fi";

interface NavbarClientProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isAdmin: boolean;
}

export default function NavbarClient({
  isOpen,
  toggleSidebar,
  isAdmin,
}: NavbarClientProps) {
  return (
    <div className="p-4 min-h-screen bg-gray-900 w-[240px] flex flex-col shadow-lg">
      <nav className="mt-14 flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {/* Always visible */}
          <li>
            <Link
              href="/settings"
              onClick={() => window.innerWidth < 768 && toggleSidebar()}
              className="flex items-center text-gray-300 rounded-lg hover:bg-gray-800 p-3"
            >
              <FiHome className="text-xl w-6" />
              <span className="ml-3">Overview</span>
            </Link>
          </li>

          {/* Admin-only: Members */}
          {isAdmin && (
            <li>
              <Link
                href="/admin/approveduser"
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
                className="flex items-center text-gray-300 rounded-lg hover:bg-gray-800 p-3"
              >
                <FiBarChart2 className="text-xl w-6" />
                <span className="ml-3">Members</span>
              </Link>
            </li>
          )}

          {/* Admin-only: Waiting List */}
          {isAdmin && (
            <li>
              <Link
                href="/admin/waitinglist"
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
                className="flex items-center text-gray-300 rounded-lg hover:bg-gray-800 p-3"
              >
                <FiUser className="text-xl w-6" />
                <span className="ml-3">Waiting List</span>
              </Link>
            </li>
          )}

          {/* Other always‑visible links */}
          <li>
            <Link
              href="/dashboard/v2trades"
              onClick={() => window.innerWidth < 768 && toggleSidebar()}
              className="flex items-center text-gray-300 rounded-lg hover:bg-gray-800 p-3"
            >
              <FiBarChart2 className="text-xl w-6" />
              <span className="ml-3">V2 Trades</span>
            </Link>
          </li>
          {/* …and so on… */}
        </ul>
      </nav>
    </div>
  );
}
