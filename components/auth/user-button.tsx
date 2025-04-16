"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { LogoutButton } from "./logout-button";

export const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Larger avatar with better fallback styling */}
        <Avatar className="cursor-pointer w-10 h-10 hover:ring-2 hover:ring-gray-500 transition-all rounded-full">
          <AvatarImage src="" alt="User avatar" />
          <AvatarFallback className="bg-gray-600 text-white text-sm rounded-full">
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          min-w-[160px]
          bg-gray-800
          border
          border-gray-700
          text-white
          font-medium
          text-sm
          rounded-md
          shadow-md
          space-y-1
          py-2
        "
      >
        {/* Profile */}
        <DropdownMenuItem
          className="
            flex items-center gap-2 
            py-2 px-3
            rounded 
            hover:bg-gray-700 
            cursor-pointer
          "
        >
          <FaUser />
          <span>Profile</span>
        </DropdownMenuItem>

        {/* Settings */}
        <DropdownMenuItem
          className="
            flex items-center gap-2 
            py-2 px-3
            rounded 
            hover:bg-gray-700 
            cursor-pointer
          "
        >
          <FaCog />
          <span>Settings</span>
        </DropdownMenuItem>

        {/* Logout */}
        <DropdownMenuItem
          className="
            flex items-center gap-2 
            py-2 px-3
            rounded 
            hover:bg-gray-700 
            cursor-pointer
          "
        >
          <FaSignOutAlt />
          <LogoutButton>
            Logout
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
