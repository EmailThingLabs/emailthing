"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { api } from "@/trpc/react";
import Link from "next/link";

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
      {domains ? (
        <DataTable columns={columns} />
      ) : (
        <div className="flex flex-col">
          <h1 className="mt-16 items-center justify-center text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:mt-24 lg:leading-[1.1]">
            Add New Domain
          </h1>
          <h2 className="pb-4 text-center text-lg text-muted-foreground md:pb-4">
            Hey! It looks like you haven&apos;t added any domains yet.
            Let&apos;s get started.
          </h2>
          <Button variant="outline" className="mx-auto" asChild>
            <Link href="/dashboard/domains/add">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add New Domain
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
