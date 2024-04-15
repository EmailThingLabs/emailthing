"use client";

import Link from "next/link";
import { AtSign, Users, Send, Settings, Home } from "lucide-react";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const activeLinkClass =
    "flex gap-3 px-3 py-2 text-primary transition-all hover:text-primary underline underline-offset-2";

  const linkClass =
    "flex gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:underline hover:underline-offset-2";

  return (
    <main className="container">
      <nav className="grid items-start px-2 text-sm font-medium">
        <Link
          href="/dashboard/settings"
          className={
            pathname === "/dashboard/settings" ? activeLinkClass : linkClass
          }
        >
          Organization{" "}
        </Link>
        <Link
          href="/dashboard/settings/ses"
          className={
            pathname === "/dashboard/settings/ses" ? activeLinkClass : linkClass
          }
        >
          AWS Setup{" "}
        </Link>
        <Link
          href="/dashboard/settings/domains"
          className={
            pathname === "/dashboard/settings/domains"
              ? activeLinkClass
              : linkClass
          }
        >
          Domains{" "}
        </Link>
      </nav>
    </main>
  );
}
