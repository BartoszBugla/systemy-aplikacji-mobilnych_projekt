"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTransactionChartData } from "@/hooks/use-transaction-chart-data";
import {
  ChartTimeRange,
  filterOptions,
  type FilterOption,
} from "@/lib/chart-config";

const chartConfig = {
  amountIncome: {
    label: "Income",
    color: "var(--color-mobile)",
  },
  amountExpense: {
    label: "Expense",
    color: "var(--color-desktop)",
  },
} satisfies ChartConfig;

interface ChartHeaderProps {
  timeRange: ChartTimeRange;
  onTimeRangeChange: (value: ChartTimeRange) => void;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({
  timeRange,
  onTimeRangeChange,
}) => (
  <CardHeader className="relative">
    <CardTitle>Revenue History</CardTitle>
    <CardDescription>
      <span className="@[540px]/card:block hidden">
        Total for the last 3 months
      </span>
      <span className="@[540px]/card:hidden">Last 3 months</span>
    </CardDescription>
    <div className="absolute right-4 top-4">
      <ToggleGroup
        type="single"
        value={timeRange}
        onValueChange={(value) => onTimeRangeChange(value as ChartTimeRange)}
        variant="outline"
        className="@[767px]/card:flex hidden"
      >
        {filterOptions.map((option: FilterOption) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            className="h-8 px-2.5"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Select
        value={timeRange}
        onValueChange={(value) => onTimeRangeChange(value as ChartTimeRange)}
      >
        <SelectTrigger
          className="@[767px]/card:hidden flex w-40"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {filterOptions.map((option: FilterOption) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="rounded-lg"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </CardHeader>
);

const ChartGradients: React.FC = () => (
  <defs>
    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1.0} />
      <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
    </linearGradient>
    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
      <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
    </linearGradient>
  </defs>
);

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState(ChartTimeRange.Month);
  const { chartData } = useTransactionChartData(timeRange);
  const { t } = useTranslation();

  const getLocale = () => {
    return i18next.language === "pl" ? "pl-PL" : "en-US";
  };

  React.useEffect(() => {
    if (isMobile) setTimeRange(ChartTimeRange.ThreeMonhts);
  }, [isMobile]);

  return (
    <Card className="@container/card">
      <ChartHeader timeRange={timeRange} onTimeRangeChange={setTimeRange} />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <ChartGradients />
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString(getLocale(), {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString(getLocale(), {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  formatter={(value) => {
                    if (typeof value === "number") {
                      return new Intl.NumberFormat(getLocale(), {
                        style: "currency",
                        currency: "USD",
                      }).format(value);
                    }
                    return value;
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="amountIncome"
              type="monotone"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
            />
            <Area
              dataKey="amountExpense"
              type="monotone"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
        <div className="mt-4 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[var(--color-mobile)]" />
            <span className="text-sm font-medium">
              {t("transaction.types.income")}:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(
                chartData.reduce(
                  (sum, item) => sum + (item.amountIncome || 0),
                  0
                )
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[var(--color-desktop)]" />
            <span className="text-sm font-medium">
              {t("transaction.types.expense")}:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(
                chartData.reduce(
                  (sum, item) => sum + (item.amountExpense || 0),
                  0
                )
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
