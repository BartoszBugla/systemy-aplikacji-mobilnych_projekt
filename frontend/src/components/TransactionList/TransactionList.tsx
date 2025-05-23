import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
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
} from "../ui/table";

import { TransactionCurrency, type TransactionResponse } from "@/lib/api/api";
import { useGetTransactions } from "@/lib/api/transaction";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { DataTablePagination } from "./Pagination";
import { useGetMe } from "@/lib/api/user";
import { cn } from "@/lib/utils";
import { ArrowUpDown, PlusIcon } from "lucide-react";
import { TransactionFormDrawer } from "../TransactionForm/TransactionFormDrawer";
import {
  formatCurrencyForLocale,
  type SortingHeaderProps,
} from "@/lib/string-formatters";
import { useTranslation } from "react-i18next";

export interface TransactionListProps {}

const SortingHeader = ({ column, label }: SortingHeaderProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const useTransactionListColumns =
  (): ColumnDef<TransactionResponse>[] => {
    const { data } = useGetMe();
    const { t } = useTranslation();

    return [
      {
        accessorKey: "description",
        header: ({ column }) => (
          <SortingHeader label={t("form.description")} column={column} />
        ),
      },

      {
        accessorKey: "amount",
        header: ({ column }) => (
          <SortingHeader label={t("form.amount")} column={column} />
        ),
        cell: ({ row }) => {
          const amount = row.original.amount;
          const currency = row.original.currency;
          const accountReceiver = row.original.accountReceiver;

          const isIncome = accountReceiver === data?.id;

          return (
            <span
              className={cn(
                "font-medium",
                isIncome ? "text-green-500" : "text-red-500"
              )}
            >
              {`${isIncome ? "+" : "-"}${formatCurrencyForLocale(amount, currency)}`}
            </span>
          );
        },
      },

      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <SortingHeader label={t("transactionList.date")} column={column} />
        ),
        cell: ({ row }) => {
          const date = new Date(row.getValue("createdAt"));

          return date.toLocaleDateString("pl-PL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        },
      },

      {
        accessorKey: "secondAccountEmail",
        header: ({ column }) => (
          <SortingHeader
            label={t("transactionList.receiverSender")}
            column={column}
          />
        ),
      },
    ];
  };

export const TransactionList = (props: TransactionListProps) => {
  const { t } = useTranslation();

  const { data } = useGetTransactions();

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useTransactionListColumns();

  const table = useReactTable({
    columns,
    data: data?.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <Card className="p-4 h-full flex-col gap-4">
      <div className="flex flex-col py-4 gap-3 sm:w-[400px] w-full">
        <TransactionFormDrawer>
          <Button>
            <PlusIcon /> {t("transactionList.addTransaction")}
          </Button>
        </TransactionFormDrawer>
        <Input
          placeholder={t("transactionList.searchPlaceholder")}
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
      </div>
      <div className="font-bold text-2xl w-full border-t border-border">
        {t("transactionList.title")}
      </div>
      <div className="flex-1">
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
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </Card>
  );
};
