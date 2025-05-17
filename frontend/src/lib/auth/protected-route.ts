import { redirect } from "@tanstack/react-router";
import { isAuthenticated } from "./is-authenticated";

export const protectedRoute = () => {
  if (!isAuthenticated()) {
    throw redirect({
      to: "/login",
      search: {
        from: location.href,
      },
    });
  }
};
