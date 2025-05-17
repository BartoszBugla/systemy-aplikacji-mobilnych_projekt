import { useAuth } from "../auth/auth.store";
import { Api } from "./api";

export interface SecurityParams {
  accessToken: string;
}

export const apiClient = new Api<SecurityParams>({
  baseUrl: import.meta.env.VITE_API_URL,
  securityWorker: (securityParams) => ({
    ...(securityParams && {
      headers: {
        Authorization: `Bearer ${securityParams?.accessToken}`,
      },
    }),
  }),
});

const initSecurityData = (accessToken?: string | null) => {
  if (!accessToken) return;

  apiClient.setSecurityData({
    accessToken,
  });
};

useAuth.subscribe((state) => {
  initSecurityData(state.accessToken);
});

initSecurityData(useAuth?.getState()?.accessToken);
