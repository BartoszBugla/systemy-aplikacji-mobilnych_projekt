import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import type {
  CreateTransactionDto,
  TransactionListResponse,
  TransactionResponse,
} from "./api";
import { apiClient } from "./api-client";
import { QueryKey } from "./query-key";

export type UseAppQueryOptions<T = object> = Omit<
  UseQueryOptions<T, Error, T>,
  "queryKey" | "queryFn"
>;

export type UseAppMutationOptions<TVariables = object, TData = object> = Omit<
  UseMutationOptions<TData, Error, TVariables>,
  "mutationFn" | "mutationKey"
>;

export const useGetTransactions = (
  options?: UseAppQueryOptions<TransactionListResponse>,
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKey.Transaction, "list"],
    queryFn: async () => {
      return apiClient.api.transactionControllerFindAll({});
    },
  });
};

export const useCreateTransaction = (
  options?: UseAppMutationOptions<CreateTransactionDto, TransactionResponse>,
) => {
  return useMutation({
    ...options,
    mutationFn: async (data: CreateTransactionDto) => {
      return apiClient.api.transactionControllerCreate(data);
    },
  });
};
