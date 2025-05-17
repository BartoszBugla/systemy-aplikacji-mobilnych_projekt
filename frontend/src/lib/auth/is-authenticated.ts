import { useAuth } from "./auth.store";

export const isAuthenticated = () => {
  return !!useAuth.getState().accessToken;
};
