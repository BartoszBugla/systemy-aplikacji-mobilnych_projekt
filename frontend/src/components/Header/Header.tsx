import { BellIcon, SunIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NotificationsList } from "../NotificationsList/NotificationsList";
import { Button } from "../ui/button";
import { LanguageSwitcher } from "../ui/language-switcher";
import { SidebarTrigger } from "../ui/sidebar";
import { useTheme } from "../ui/theme-provider";
import { useGetNotifications } from "@/lib/api/notification";

export const Header = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { data: notifications } = useGetNotifications();

  return (
    <header className="flex h-16 items-center gap-4 border-b px-4">
      <SidebarTrigger aria-label={t("header.toggleSidebar")} />
      <div className="flex-1" />
      <LanguageSwitcher />
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={t("header.toggleTheme")}
      >
        <SunIcon className="h-5 w-5" />
      </Button>
      <NotificationsList>
        <Button
          variant="outline"
          size="icon"
          aria-label={t("header.notifications")}
          className="relative"
        >
          <BellIcon className="h-5 w-5" />
          {notifications?.data.length ? (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-primary-foreground">
              {notifications.data.length}
            </span>
          ) : null}
        </Button>
      </NotificationsList>
      <NotificationsList />
    </header>
  );
};
