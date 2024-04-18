"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect } from "react";
import { PlusIcon, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  columns: ColumnDef<DomainData>[];
}

interface DomainData {
  id: string;
  domain: string;
  organizationId: string;
  status: string;
}

export function DataTable({ columns }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const {
    data: tableData,
    isLoading,
    isError,
    error,
  } = api.domain.get.useQuery(undefined, {
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  const table = useReactTable({
    data: tableData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const {
    mutate,
    isSuccess: deleteSuccess,
    isError: deleteError,
    isPending,
  } = api.domain.delete.useMutation();

  function deleteSelected(ids: string[]) {
    const deletionPromises = ids.map(async (id) => {
      try {
        console.log("Deleting domain with id:", id);
        mutate({ id: id });
        return { id, status: "Success" };
      } catch (error) {
        return { id, status: "Failed", error };
      }
    });

    const results = Promise.all(deletionPromises);

    return results;
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Successfully removed domain(s)", {
        description: "The selected domain(s) have been deleted.",
      });
    }

    if (deleteError) {
      toast.error("Error", {
        description:
          "There was an error deleting the domain(s). Please try again.",
      });
    }
  }, [deleteSuccess, deleteError]);

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search domains"
          value={(table.getColumn("domain")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("domain")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() =>
            deleteSelected(
              table
                .getFilteredSelectedRowModel()
                .rows.map((row) => (row.original as { id: string }).id),
            )
          }
          disabled={
            table.getFilteredSelectedRowModel().rows.length === 0 || isPending
          }
        >
          Delete Selected
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
