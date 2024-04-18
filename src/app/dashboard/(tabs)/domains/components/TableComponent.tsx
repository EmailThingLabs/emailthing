"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { api } from "@/trpc/react";
import { Card, CardContent } from "@/components/ui/card";

export function TableComponent() {
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
        <Card>
          <CardContent className="py-4">
            <DataTable columns={columns} />
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
}
