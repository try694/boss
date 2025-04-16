// app/(protected)/approveduser/page.tsx
"use client";

import React from "react";

import { UserRole } from "@prisma/client";
import ApprovedUsersComp from "../../_components/ApprovedUsersComp";
import { RoleGate } from "@/components/auth/role-gate";


export default function ApprovedUsersPage() {
  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <div className="p-4">
        <h1 className="text-xl text-gray-100 font-semibold mb-4">Approved Users</h1>
        <ApprovedUsersComp />
      </div>
    </RoleGate>
  );
}
