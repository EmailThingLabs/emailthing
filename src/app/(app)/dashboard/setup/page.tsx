"use server";

import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";
import { SetupForm } from "./components/Setup";

export default async function Setup() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/login");
  }

  const isSetup = await api.user.isSetup();

  if (isSetup?.onboarded === true) {
    return redirect("/dashboard");
  }

  return <SetupForm />;
}
