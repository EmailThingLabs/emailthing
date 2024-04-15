"use server";

import { SettingsForm } from "./components/SettingsForm";
import { SettingsInstructions } from "./components/SettingsInstructions";

export default async function Settings() {
  return (
    <div className="container">
      <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
        <div className="md:w-1/2">
          <SettingsForm />
        </div>
        <div className="md:w-1/2">
          <SettingsInstructions />
        </div>
      </div>
    </div>
  );
}
