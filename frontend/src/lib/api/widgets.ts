import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api-client";
import { QueryKey } from "./query-key";
import type { NewSpendLimitDto } from "./api";

export enum WidgetType {
  TotalAmount = "total-amount",
  GraphData = "graph-data",
  Spend = "spend",
}

export const useTotalAmountWidgetData = () => {
  return useQuery({
    queryKey: [QueryKey.Widget, WidgetType.TotalAmount],
    queryFn: async () => {
      return apiClient.api.widgetControllerTotalAmount();
    },
  });
};

export const useGetTransactionGraphData = (timeFrom: string) => {
  return useQuery({
    queryKey: [QueryKey.Widget, WidgetType.GraphData, timeFrom],
    queryFn: async () => {
      return apiClient.api.widgetControllerTransactionGraph({
        from: timeFrom,
      });
    },
  });
};

export const useGetSpendWidget = () => {
  return useQuery({
    queryKey: [QueryKey.Widget, WidgetType.Spend],
    queryFn: async () => {
      return apiClient.api.widgetControllerSpend();
    },
  });
};

export const useSetSpendLimit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NewSpendLimitDto) => {
      return apiClient.api.widgetControllerSetSpendLimit(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Widget, WidgetType.Spend],
      });
    },
  });
};
