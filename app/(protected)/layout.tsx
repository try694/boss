// app/(protected)/layout.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import ClientDashboardLayout from "./ClientDashboardLayout";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const user = await getUserById(session.user.id);
  if (!user) redirect("/auth/login");

  const isAdmin = user.role === "ADMIN";

  return (
    <ClientDashboardLayout user={user} isAdmin={isAdmin}>
      {children}
    </ClientDashboardLayout>
  );
}
