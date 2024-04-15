"use server";

import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { AddDomainForm } from "./components/AddDomainForm";

export default async function AddDomain() {
  const isSetup = await api.settings.isSetup();

  if (!isSetup) {
    redirect("/dashboard/settings");
  }

  return (
    <div className="container">
      <AddDomainForm />
    </div>
  );
}
