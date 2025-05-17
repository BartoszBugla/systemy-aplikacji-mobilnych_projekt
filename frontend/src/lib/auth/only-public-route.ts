import { redirect } from "@tanstack/react-router";
import { isAuthenticated } from "./is-authenticated";

export const onlyPublicRoute = () => {
  if (isAuthenticated()) {
    throw redirect({
      to: "/dashboard",
    });
  }
};
