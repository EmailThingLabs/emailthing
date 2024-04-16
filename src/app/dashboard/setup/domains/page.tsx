"use server";

import { TableComponent } from "./components/TableComponent";
import { AddDomainForm } from "./components/AddDomainForm";
import { SettingCard } from "@/components/ui/setting-card";

export default async function Domains() {
  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="Add Domain"
        description="Configure a domain name to send emails."
      >
        <AddDomainForm />
        <div className="mt-4">
          <TableComponent />
        </div>
      </SettingCard>
    </div>
  );
}
