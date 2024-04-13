import { getProviders } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./components/login";
import { useParams } from "next/navigation";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const session = await getServerAuthSession();
  const providers = await getProviders();

  if (session) {
    redirect("/dashboard");
  }

  if (!providers) {
    return (
      <div>
        <p className="text-xs text-muted-foreground">
          No authentication providers available, please try again later.
        </p>
      </div>
    );
  }

  return <LoginForm providers={providers} />;
}
