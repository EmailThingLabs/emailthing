import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

export default async function Dashboard() {
  const isOrgSetup = await api.org.isOrgSetup();

  if (!isOrgSetup.setup) {
    redirect("/organization-setup");
  }

  redirect("/dashboard/settings");
  return <></>;
}
