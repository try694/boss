// app/(protected)/waitinglist/page.tsx
"use client";

import React from "react";
import { UserRole } from "@prisma/client";
import WaitingListComp from "../../_components/waitinglistcomp";
import { RoleGate } from "@/components/auth/role-gate";

export default function WaitingListPage() {
  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-100 mb-4">Waiting List</h1>
        <WaitingListComp />
      </div>
    </RoleGate>
  );
}
