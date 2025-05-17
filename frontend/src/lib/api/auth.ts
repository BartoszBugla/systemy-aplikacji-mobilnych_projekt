import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../auth/auth.store";
import type { LoginDto, RegisterDto } from "./api";
import { apiClient } from "./api-client";
import type { UseAppMutationOptions } from "./transaction";

export const useLogin = (options?: UseAppMutationOptions) => {
  const { setTokens } = useAuth();

  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: async (data: LoginDto) => {
      const { accessToken } = await apiClient.api.authControllerLogin(data);

      setTokens(accessToken, accessToken);

      return data;
    },

    onSuccess: (...args) => {
      navigate({
        to: "/dashboard",
      });

      options?.onSuccess?.(...args);
    },
  });
};

export const useRegister = (options?: UseAppMutationOptions) => {
  const { setTokens } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    ...options,
    onSuccess: (...args) => {
      navigate({
        to: "/dashboard",
      });

      options?.onSuccess?.(...args);
    },

    mutationFn: async (data: RegisterDto) => {
      const { accessToken } = await apiClient.api.authControllerRegister(data);

      setTokens(accessToken, accessToken);

      return data;
    },
  });
};

export const useLogout = (options?: UseAppMutationOptions<null, null>) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  return useMutation({
    ...options,

    mutationFn: async () => {
      localStorage.clear();
      logout();

      navigate({
        to: "/login",
      });

      return null;
    },
  });
};
