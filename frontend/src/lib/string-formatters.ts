import type { Column } from "@tanstack/react-table";
import { TransactionCurrency, type TransactionResponse } from "./api";

const currencyToLocaleMap = {
  [TransactionCurrency.EUR]: "de-DE",
  [TransactionCurrency.USD]: "en-US",
};

export const formatCurrencyForLocale = (
  amount: number,
  currency: TransactionCurrency
) =>
  amount.toLocaleString(currencyToLocaleMap[currency], {
    style: "currency",
    currency,
  });

export interface SortingHeaderProps {
  column: Column<TransactionResponse, unknown>;
  label: string;
}
