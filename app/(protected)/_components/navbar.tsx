// components/Navbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FiHome, FiBarChart2, FiUser } from "react-icons/fi";

interface NavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isAdmin: boolean;
}

export default function Navbar({ isOpen, toggleSidebar, isAdmin }: NavbarProps) {
  const navItems = [
    { href: "/settings",             icon: <FiHome />,     text: "Overview",    adminOnly: false },
    { href: "/admin/approveduser",   icon: <FiBarChart2 />, text: "Members",     adminOnly: true  },
    { href: "/admin/waitinglist",    icon: <FiUser />,      text: "Waiting List",adminOnly: true  },
    // …other items…
  ];

  const visibleNavItems = navItems.filter(item =>
    item.adminOnly ? isAdmin : true
  );

  return (
    <div className="p-4 min-h-screen bg-gray-900 w-[240px] flex flex-col shadow-lg">
      <nav className="mt-14 flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {visibleNavItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
                className="flex items-center text-gray-300 rounded-lg hover:bg-gray-800 transition-colors p-3"
              >
                <span className="text-xl w-6 flex justify-center">{item.icon}</span>
                <span className="ml-3 font-medium text-sm truncate">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
