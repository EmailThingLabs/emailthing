import { siteConfig } from "@/config/site";

import { Icons } from "@/components/ui/icons";

import { getServerAuthSession } from "@/server/auth";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/nav/page-header";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <PageHeader>
        <Icons.logo className="h-16 w-16" />
        <PageHeaderHeading>{siteConfig.name}</PageHeaderHeading>
        <PageHeaderDescription>{siteConfig.description}</PageHeaderDescription>
      </PageHeader>
    </>
  );
}
