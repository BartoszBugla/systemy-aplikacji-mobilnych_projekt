import { useTotalAmountWidgetData } from "@/lib/api/widgets";
import { TrendingUpIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export interface TotalAmountWidgetProps {}

export const TotalAmountWidget = () => {
  const { data } = useTotalAmountWidgetData();
  const { t } = useTranslation();

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>{t("dashboard.totalRevenue")}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {data?.totalAmount?.toFixed(2)}
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendingUpIcon className="size-3" />
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
};
