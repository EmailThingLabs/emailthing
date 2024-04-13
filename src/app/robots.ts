import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  const headersList = headers();
  const domain = headersList.get("host")! as string;

  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/$", "/api/og/"],
        disallow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
    ],
    sitemap: `https://${domain}/sitemap.xml`,
  };
}
