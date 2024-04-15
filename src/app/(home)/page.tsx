import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/ui/icons";
import { getServerAuthSession } from "@/server/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageActions,
} from "@/components/nav/page-header";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{siteConfig.name}</PageHeaderHeading>
        <PageHeaderDescription>{siteConfig.description}</PageHeaderDescription>
        <PageActions>
          {session ? (
            <Link href="/dashboard" className={cn(buttonVariants())}>
              Dashboard
            </Link>
          ) : (
            <Link href="/auth/login" className={cn(buttonVariants())}>
              Get Started
            </Link>
          )}
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.github className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </PageActions>
      </PageHeader>
    </>
  );
}
