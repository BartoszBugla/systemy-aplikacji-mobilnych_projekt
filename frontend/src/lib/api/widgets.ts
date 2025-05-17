import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./api-client";
import { QueryKey } from "./query-key";

export enum WidgetType {
  TotalAmount = "total-amount",
  GraphData = "graph-data",
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
