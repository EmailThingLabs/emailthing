import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

export default async function Dashboard() {
  const isOrgSetup = await api.org.isOrgSetup();

  if (!isOrgSetup.setup) {
    redirect("/organization-setup");
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
