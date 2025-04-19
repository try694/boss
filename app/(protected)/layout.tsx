// app/(protected)/layout.tsx
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import ClientDashboardLayout from "./ClientDashboardLayout";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 1) Grab the session
  const session = await auth();
  if (!session?.user?.id) {
    // no session → redirect to login
    redirect("/auth/login");
  }

  // 2) Fetch the full user record by ID
  const user = await getUserById(session.user.id);
  if (!user) {
    redirect("/auth/login");
  }

  // 3) Render the client layout with the user prop
  return <ClientDashboardLayout user={user}>{children}</ClientDashboardLayout>;
}
