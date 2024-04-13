"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export function MainNav() {
  return (
    <div className="flex">
      <Link href="/" className="flex items-center">
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
    </div>
  );
}
