"use server";

import { UpdateDomainForm } from "./components/UpdateDomainForm";

export default async function Page({ params }: { params: { id: string } }) {
  return <UpdateDomainForm params={params} />;
}
