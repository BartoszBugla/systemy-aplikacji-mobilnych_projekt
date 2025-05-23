import { useGetNotifications } from "@/lib/api/notification";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { NotificationItem } from "./NotificationListItem";
import { useTranslation } from "react-i18next";

export type NotificationsListProps = React.ComponentProps<typeof Popover>;

export const NotificationsList = ({ children }: NotificationsListProps) => {
  const { data } = useGetNotifications();
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 max-h-[400px] overflow-auto">
        {data?.data.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}

        {data?.data.length === 0 && (
          <div className="text-center text-sm text-muted-foreground">
            {t("notifications.empty")}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
