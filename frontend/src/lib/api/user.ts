import { useQuery } from "@tanstack/react-query";

import { apiClient } from "./api-client";
import { QueryKey } from "./query-key";

export const useGetMe = () => {
  return useQuery({
    queryKey: [QueryKey.Me],
    queryFn: async () => {
      return apiClient.api.userControllerGetMe();
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: [QueryKey.User, "list"],
    queryFn: async () => {
      return apiClient.api.userControllerGetUsers();
    },
  });
};
