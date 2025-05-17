export type User = {
  id: string;
  email: string;
  role: string;
};

export type SessionState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};
