export enum ChartTimeRange {
  ThreeMonhts = "90d",
  Month = "30d",
  Week = "7d",
}

export interface FilterOption {
  value: ChartTimeRange;
  label: string;
}

export const filterOptions: FilterOption[] = [
  {
    value: ChartTimeRange.ThreeMonhts,
    label: "Last 3 months",
  },
  {
    value: ChartTimeRange.Month,
    label: "Last 30 days",
  },
  {
    value: ChartTimeRange.Week,
    label: "Last 7 days",
  },
];

export const getDaysToSubtract = (timeRange: ChartTimeRange): number => {
  switch (timeRange) {
    case ChartTimeRange.ThreeMonhts:
      return 90;
    case ChartTimeRange.Month:
      return 30;
    case ChartTimeRange.Week:
      return 7;
    default:
      return 0;
  }
};
