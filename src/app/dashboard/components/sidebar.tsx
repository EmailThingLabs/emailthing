"use client";

import Link from "next/link";
import { AtSign, Users, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const activeLinkClass =
    "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";

  const linkClass =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        href="/dashboard/domains"
        className={
          pathname === "/dashboard/domains" ? activeLinkClass : linkClass
        }
      >
        <AtSign className="h-4 w-4" />
        Domains{" "}
      </Link>
      <Link
        href="/dashboard/audiences"
        className={
          pathname === "/dashboard/audiences" ? activeLinkClass : linkClass
        }
      >
        <Users className="h-4 w-4" />
        Audiences
      </Link>
      <Link
        href="/dashboard/campaigns"
        className={
          pathname === "/dashboard/campaigns" ? activeLinkClass : linkClass
        }
      >
        <Send className="h-4 w-4" />
        Campaign
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          6
        </Badge>
      </Link>
    </nav>
  );
}
