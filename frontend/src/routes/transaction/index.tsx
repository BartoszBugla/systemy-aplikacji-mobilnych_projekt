import { TransactionList } from "@/components/TransactionList/TransactionList";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { protectedRoute } from "@/lib/auth/protected-route";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transaction/")({
  component: RouteComponent,
  beforeLoad: () => {
    protectedRoute();
  },
});

function RouteComponent() {
  return (
    <DashboardLayout>
      <TransactionList />
    </DashboardLayout>
  );
}
