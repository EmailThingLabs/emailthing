"use client";

import { api } from "@/trpc/react";

export function AudiencesTable() {
  const data = api.audiences.getCurrentOrnpmgAudiences.useQuery();

  return <div>{JSON.stringify(data)}</div>;
}
