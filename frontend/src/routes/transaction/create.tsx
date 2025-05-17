import { TransactionForm } from "@/components/TransactionForm/TransactionForm";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { protectedRoute } from "@/lib/auth/protected-route";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transaction/create")({
  component: RouteComponent,
  beforeLoad: () => {
    protectedRoute();
  },
});

function RouteComponent() {
  return (
    <DashboardLayout>
      <TransactionForm />
    </DashboardLayout>
  );
}
