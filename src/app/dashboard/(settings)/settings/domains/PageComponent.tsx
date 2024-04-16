"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PageComponent() {
  const [domains, hasDomains] = useState(false);

  const { data, isSuccess, isLoading, isError, isFetching, isFetched } =
    api.domain.get.useQuery(undefined, {
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    });

  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        hasDomains(true);
      } else {
        hasDomains(false);
      }
    }
  }, [data, hasDomains]);

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Domain Configuration</CardTitle>
          <CardDescription>Manage your domains.</CardDescription>
        </CardHeader>
        <CardContent>
          {domains ? (
            <DataTable columns={columns} />
          ) : (
            <Button variant="outline" className="mx-auto" asChild>
              <Link href="/dashboard/settings/domains/add">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add New Domain
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
