import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { LogoutForm } from "./components/logout";

export default async function LogoutPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <LogoutForm />;
}
