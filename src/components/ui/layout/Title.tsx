import React from "react";
import { Skeleton } from "./Skeleton";

export default function Title({
  title,
  children,
  loading = false,
}: {
  title: string;
  children?: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <div className="flex h-16 w-full select-none items-center justify-between border-neutral-100 py-2 dark:border-neutral-800">
      <h1 className="text-xl font-medium">{title}</h1>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
