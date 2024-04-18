import { api } from "@/trpc/react";

export async function AudiencesTable() {
  const { data, error, isLoading } =
    api.audiences.getCurrentOrgAudiences.useQuery();

  return <div>{isLoading ? "Loading..." : JSON.stringify(data)}</div>;
}
