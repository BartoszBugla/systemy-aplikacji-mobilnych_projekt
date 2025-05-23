import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { BudgetLimitWidget } from "@/components/widgets/BudgetLimitWidget";
import { SettingsWidget } from "@/components/widgets/SettingsWidget";
import { TotalAmountWidget } from "@/components/widgets/TotalAmountWidget";
import { ChartAreaInteractive } from "@/components/widgets/TransactionAmountChartWidget";
import { protectedRoute } from "@/lib/auth/protected-route";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: () => {
    protectedRoute();
  },
});

function RouteComponent() {
  return (
    <DashboardLayout>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="w-full *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
          <TotalAmountWidget />
          <BudgetLimitWidget />
        </div>
        <div className="px-4 lg:px-4">
          <ChartAreaInteractive />
        </div>
      </div>
    </DashboardLayout>
  );
}
