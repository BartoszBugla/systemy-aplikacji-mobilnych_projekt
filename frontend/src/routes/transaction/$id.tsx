import { protectedRoute } from "@/lib/auth/protected-route";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transaction/$id")({
  component: RouteComponent,
  beforeLoad: () => {
    protectedRoute();
  },
});

function RouteComponent() {
  return <div>Hello "/transaction/$id"!</div>;
}
