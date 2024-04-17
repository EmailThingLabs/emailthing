"use server";

import { redirect } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/ui/icons";
import { getServerAuthSession } from "@/server/auth";
import { buttonVariants } from "@/components/ui/button";
import { OnboardingForm } from "./components/OnboardingForm";
import { cn } from "@/lib/utils";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageActions,
} from "@/components/nav/page-header";

export default async function Onboarding() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col">
      <h1 className="mt-16 items-center justify-center text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:mt-24 lg:leading-[1.1]">
        Setup Organization
      </h1>
      <h2 className="pb-8 text-center text-lg text-muted-foreground md:pb-16">
        Welcome! First, let&apos;s setup your organization.
      </h2>
      <div className="w-full self-center px-8 md:w-1/3 md:px-0">
        <OnboardingForm />
      </div>
    </div>
  );
}
