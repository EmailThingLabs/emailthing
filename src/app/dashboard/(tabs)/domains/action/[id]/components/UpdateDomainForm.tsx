"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UpdateDomainForm({ params }: { params: { id: string } }) {
  const { data, isLoading, isSuccess, isError, isFetching, isFetched } =
    api.domain.one.useQuery({ id: params.id });

  const {
    mutate,
    isSuccess: verifySuccess,
    isError: verifyError,
    isPending,
  } = api.domain.verify.useMutation();

  function verify() {
    mutate({ id: params.id });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Domain</CardTitle>
          <CardDescription>Update or verify your domain</CardDescription>
        </CardHeader>
        <CardContent>
          {data && (
            <div className="flex flex-col">
              {data.domain} {data.status} {data.id} {data.organizationId}
              <Button className="mt-4" type="submit" onClick={verify}>
                Verify
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
