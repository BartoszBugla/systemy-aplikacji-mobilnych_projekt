import * as React from "react";
import { TransactionType } from "@/lib/api";
import { useGetTransactionGraphData } from "@/lib/api/widgets";
import { ChartTimeRange, getDaysToSubtract } from "@/lib/chart-config";

interface ChartDataItem {
  date: string;
  amountIncome: number;
  amountExpense: number;
}

export const getFromDateByRange = (timeRange: ChartTimeRange) => {
  const date = new Date();
  const daysToSubtract = getDaysToSubtract(timeRange);
  date.setDate(date.getDate() - daysToSubtract);
  return date.toISOString();
};

export const useTransactionChartData = (timeRange: ChartTimeRange) => {
  const { data: rawChartData } = useGetTransactionGraphData(
    React.useMemo(() => getFromDateByRange(timeRange), [timeRange])
  );

  const chartData = React.useMemo(() => {
    const dailyData = new Map<string, ChartDataItem>();

    (rawChartData?.data || []).forEach((item) => {
      const date = new Date(item.date);
      const formattedDate = date.toISOString().split("T")[0];

      if (!dailyData.has(formattedDate)) {
        dailyData.set(formattedDate, {
          date: formattedDate,
          amountIncome: 0,
          amountExpense: 0,
        });
      }

      const dayData = dailyData.get(formattedDate)!;
      if (item.type === TransactionType.Income) {
        dayData.amountIncome += item.amount;
      } else {
        dayData.amountExpense += item.amount;
      }
    });

    return Array.from(dailyData.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [rawChartData]);

  return {
    chartData,
  };
};
