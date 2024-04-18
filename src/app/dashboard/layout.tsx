import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

import Sidebar from "./components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="grid w-full flex-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="border-r py-6">
        <div className="flex h-full flex-col gap-2">
          <div className="flex-1">
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
