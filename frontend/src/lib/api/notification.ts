import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { NotificationListResponse, NotificationResponse } from "./api";
import { apiClient } from "./api-client";
import { QueryKey } from "./query-key";
import { getContext } from "@/integrations/tanstack-query/root-provider";

export const useGetNotifications = () => {
  return useQuery({
    queryKey: [QueryKey.Notification, "list"],
    queryFn: async () => apiClient.api.notificationControllerGetNotifications(),
  });
};

export const handlePushNotification = (notification: NotificationResponse) => {
  const { queryClient } = getContext();

  queryClient.setQueryData(
    [QueryKey.Notification, "list"],
    (oldData: NotificationListResponse | undefined) => {
      if (!oldData) return { data: [notification] };
      return { data: [...(oldData?.data || []), notification] };
    }
  );
};

export const useMarkNotificationAsSeen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) =>
      apiClient.api.notificationControllerUpdate(notificationId, {
        seen: true,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Notification, "list"],
      });
    },
  });
};
