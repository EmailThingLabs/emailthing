import { SettingCard } from "@/components/ui/setting-card";
import { OrgForm } from "./components/OrgForm";

export default async function OrgSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <SettingCard title="TODO" description="TODO">
        <OrgForm />
      </SettingCard>
    </div>
  );
}
