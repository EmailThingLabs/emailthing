import { SettingCard } from "@/components/ui/setting-card";
import { SettingsForm } from "./components/SettingsForm";

export default async function SetupAWS() {
  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="Mail Setup"
        description="Configure your AWS SES credentials to send emails."
      >
        <SettingsForm />
      </SettingCard>
    </div>
  );
}
