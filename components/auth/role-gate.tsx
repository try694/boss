"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  const router = useRouter();

  // When role is defined and does not match, redirect to "/settings"
  useEffect(() => {
    if (role !== undefined && role !== allowedRole) {
      router.replace("/settings");
    }
  }, [role, allowedRole, router]);

  // While the role is loading or if it doesn't match (waiting for redirect), render nothing.
  if (role === undefined || role !== allowedRole) return null;

  return <>{children}</>;
};
