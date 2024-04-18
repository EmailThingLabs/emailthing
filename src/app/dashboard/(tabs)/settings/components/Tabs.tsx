"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/layout/TabStyles";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

export default function SettingsTabs() {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  return (
    <Tabs orientation="horizontal" value={segment ?? "org"}>
      <TabsList className="px-0">
        {[
          { value: "org", label: "Organization" },
          { value: "mail", label: "Mail" },
        ].map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            onClick={() => {
              router.push(`./${tab.value}`);
            }}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
