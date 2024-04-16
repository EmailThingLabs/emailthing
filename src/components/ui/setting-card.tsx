"use client";

import { Label } from "@/components/ui/label";
import { FC, ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export const SettingCard: FC<Props> = ({ title, description, children }) => {
  return (
    <div className="flex flex-col gap-4 rounded-md border-neutral-200 py-8 dark:border-neutral-800 lg:flex-row">
      <div className="flex select-none flex-col gap-1 lg:w-1/4">
        <Label className="text-md">{title}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};
