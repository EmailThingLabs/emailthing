"use server";

import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

export default async function Setup() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/login");
  }

  const isSetup = await api.user.isSetup();

  if (isSetup?.onboarded === true) {
    return redirect("/dashboard");
  }

  return (
    <div>
      <h1>Welcome to the dashboard, {session.user.name}!</h1>
      <p>
        You are now setting up. This is a placeholder page for the onboarding
        process.
      </p>
    </div>
  );
}
