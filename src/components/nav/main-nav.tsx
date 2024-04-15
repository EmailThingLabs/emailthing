"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { Send } from "lucide-react";
import Logo from "@/components/nav/logo";

export function MainNav() {
  return (
    <div className="flex">
      <Link href="/" className="align-center flex items-center">
        <Logo className="mr-2 h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
    </div>
  );
}
