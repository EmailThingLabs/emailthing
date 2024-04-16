"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex gap-4 border-b px-4",
      "dark:border-neutral-700",
      "border-neutral-100",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "z-10 mb-[-1px] border-b-2 border-transparent pb-[14px] font-medium transition-colors duration-200",
      "data-[state=active]:border-b-2",
      "hover:border-b-2",
      "dark:text-muted-foreground",
      "dark:data-[state=active]:border-primary dark:data-[state=active]:text-primary",
      "dark:hover:border-primary dark:hover:text-primary",
      "text-muted-foreground",
      "data-[state=active]:border-primary data-[state=active]:text-primary",
      "hover:border-primary hover:text-primary",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
      className,
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Content>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
export { Tabs, TabsContent, TabsList, TabsTrigger };
