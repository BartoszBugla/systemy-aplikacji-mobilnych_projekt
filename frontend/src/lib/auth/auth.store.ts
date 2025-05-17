import { create } from "zustand";

import { persist } from "zustand/middleware";
import type { SessionState } from "./auth.store.types";

export const useAuth = create(
  persist<SessionState>(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "user-session",
    },
  ),
);
