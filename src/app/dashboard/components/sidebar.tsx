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

  const isActive = (path: string) => {
    return pathname === path;
  };

  const tabs = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "Emails",
      icon: Send,
      path: "/dashboard/emails",
    },
    {
      name: "Audiences",
      icon: Users,
      path: "/dashboard/audiences",
    },
    {
      name: "Domains",
      icon: AtSign,
      path: "/dashboard/domains",
    },
    {
      name: "Setup",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          href={tab.path}
          className={isActive(tab.path) ? activeLinkClass : linkClass}
        >
          <tab.icon className="h-4 w-4" />
          {tab.name}
        </Link>
      ))}
    </nav>
  );
}
