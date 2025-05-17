import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Switch } from "../ui/switch";
import { Toggle } from "../ui/toggle";

export interface SettingsWidgetProps {}

export const SettingsWidget = (props: SettingsWidgetProps) => {
  const { t } = useTranslation();

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>{t("dashboard.configureSettings")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm w-full justify-between">
          <span>{t("dashboard.pushNotifications")}</span>
          <Switch />
        </div>
        <div className="flex items-center gap-2 text-sm w-full justify-between">
          <span>{t("dashboard.inAppNotifications")}</span>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};
