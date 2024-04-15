"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Send } from "lucide-react";

export function MainNav() {
  return (
    <div className="flex">
      <Link href="/" className="flex items-center">
        <Send className="mr-2 size-5" strokeWidth={2.3} />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
    </div>
  );
}
