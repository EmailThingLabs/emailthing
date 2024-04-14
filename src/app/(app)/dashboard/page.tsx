import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  }

  const isSetup = await api.user.isSetup();

  if (isSetup?.onboarded === false) {
    redirect("/dashboard/setup");
  }

  return <></>;
}
