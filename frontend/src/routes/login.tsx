import { createFileRoute } from "@tanstack/react-router";

import { LoginForm } from "@/components/LoginForm/LoginForm";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: () => {},
});

function RouteComponent() {
  return <LoginForm />;
}
