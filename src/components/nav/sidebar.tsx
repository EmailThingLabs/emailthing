"use client";

import Link from "next/link";
import { AtSign, Users, Send, Settings, Home } from "lucide-react";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const activeLinkClass =
    "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";

  const linkClass =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";

  const isActive = (path: string, exact = false) => {
    return exact
      ? pathname === path
      : pathname === path || pathname.startsWith(`${path}/`);
  };
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        href="/dashboard"
        className={isActive("/dashboard", true) ? activeLinkClass : linkClass}
      >
        <Home className="h-4 w-4" />
        Home{" "}
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
          isActive("/dashboard/campaigns") ? activeLinkClass : linkClass
        }
      >
        <Send className="h-4 w-4" />
        Campaign
      </Link>
      <Link
        href="/dashboard/settings"
        className={
          isActive("/dashboard/settings") ? activeLinkClass : linkClass
        }
      >
        <Settings className="h-4 w-4" />
        Setup
      </Link>
    </nav>
  );
}
