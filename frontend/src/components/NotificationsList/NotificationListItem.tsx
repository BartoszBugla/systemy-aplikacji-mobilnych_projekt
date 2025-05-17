import type { NotificationResponse } from "@/lib/api";
import { InfoIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { useMarkNotificationAsSeen } from "@/lib/api/notification";

export interface NotificationItemProps {
  notification: NotificationResponse;
}

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { title, message, createdAt, seen } = notification;

  const { mutate: markAsSeen } = useMarkNotificationAsSeen();

  return (
    <Collapsible
      onClick={() => markAsSeen(notification.id)}
      className={cn("text-start border border-border rounded-md p-2", {
        "border-primary": !seen,
      })}
    >
      <CollapsibleTrigger className="flex flex-col gap-2 justify-start text-left">
        <div className="flex items-center gap-2 justify-between">
          <div className="self-start">
            <InfoIcon className="size-6" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium ">{title}</div>
            <div className="text-xs self-start text-muted-foreground">
              {format(createdAt, "dd.MM.yyyy HH:mm")}
            </div>
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent asChild>
        <div className="text-xs mt-1">{message}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};
