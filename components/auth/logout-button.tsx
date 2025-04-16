"use client"

import { logout } from "@/actions/logout";
import { Children } from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
};

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

return (
  <span onClick={onClick} className="cursor-pointer">
    {children}
  </span>
)
}