import type { SiteConfig } from "@/types";

import { env } from "@/env.js";

export const siteConfig: SiteConfig = {
  name: "EmailThing",
  author: "ivryb, lewisbuildsai",
  description: "Open source email, made easy.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
    "shadcn/ui",
    "AWS SES",
    "Docker",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://emailthing.io",
  },
  links: {
    github: "https://github.com/EmailThingLabs/emailthing",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/api/og/screenshot?url=${env.NEXT_PUBLIC_APP_URL}`,
};
