// components/Navbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FiHome, FiBarChart2, FiUser } from "react-icons/fi";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";

interface NavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ isOpen, toggleSidebar }: NavbarProps) {
  return (
    <div className="p-4 min-h-screen bg-gray-900 w-[240px] flex flex-col shadow-lg">
      {/* Navigation */}
      <nav className="mt-14 flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {/* Non-admin nav item: Overview */}
          <li>
            <Link
              href="/settings"
              onClick={() => {
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className="flex items-center text-gray-300 rounded-lg hover:bg-gray-800 transition-colors p-3 group"
            >
              <span className="text-xl w-6 flex justify-center">
                <FiHome />
              </span>
              <span className="ml-3 font-medium text-sm truncate">Overview</span>
            </Link>
          </li>

          {/* Admin-only nav items wrapped in RoleGate */}
          <RoleGate allowedRole={UserRole.ADMIN}>
            <li>
              <Link
                href="/admin/approveduser"
                onClick={() => {
                  if (window.innerWidth < 768) toggleSidebar();
                }}
                className="flex items-center text-gray-300 rounded-lg hover:bg-gray-800 transition-colors p-3 group"
              >
                <span className="text-xl w-6 flex justify-center">
                  <FiBarChart2 />
                </span>
                <span className="ml-3 font-medium text-sm truncate">Members</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/waitinglist"
                onClick={() => {
                  if (window.innerWidth < 768) toggleSidebar();
                }}
                className="flex items-center text-gray-300 rounded-lg hover:bg-gray-800 transition-colors p-3 group"
              >
                <span className="text-xl w-6 flex justify-center">
                  <FiUser />
                </span>
                <span className="ml-3 font-medium text-sm truncate">Waiting List</span>
              </Link>
            </li>
          </RoleGate>

          {/* Additional non-admin nav items */}
          <li>
            <Link
              href="/dashboard/v2trades"
              onClick={() => {
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className="flex items-center text-gray-300 rounded-lg hover:bg-gray-800 transition-colors p-3 group"
            >
              <span className="text-xl w-6 flex justify-center">
                <FiBarChart2 />
              </span>
              <span className="ml-3 font-medium text-sm truncate">V2 Trades</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/v3trades"
              onClick={() => {
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className="flex items-center text-gray-300 rounded-lg hover:bg-gray-800 transition-colors p-3 group"
            >
              <span className="text-xl w-6 flex justify-center">
                <FiBarChart2 />
              </span>
              <span className="ml-3 font-medium text-sm truncate">V3 Trades</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/v4trades"
              onClick={() => {
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className="flex items-center text-gray-300 rounded-lg hover:bg-gray-800 transition-colors p-3 group"
            >
              <span className="text-xl w-6 flex justify-center">
                <FiBarChart2 />
              </span>
              <span className="ml-3 font-medium text-sm truncate">V4 Trades</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
