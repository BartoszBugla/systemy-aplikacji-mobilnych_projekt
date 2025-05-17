import { DollarSignIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLogout } from "@/lib/api";
import { useGetMe } from "@/lib/api/user";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const data = {
  navMain: [
    {
      title: "nav.dashboard",
      url: "/dashboard",
    },
    {
      title: "nav.transactions",
      url: "/transaction",
    },
  ],
};

export const Sidebar = ({
  ...props
}: React.ComponentProps<typeof BaseSidebar>) => {
  const { mutate } = useLogout();
  const { data: user } = useGetMe();
  const { t } = useTranslation();

  return (
    <BaseSidebar collapsible="offcanvas" variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <DollarSignIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{t("nav.appName")}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="items-center flex w-full justify-center">
          <Avatar className="size-20 border-primary border-2">
            <AvatarFallback>{`${user?.firstName?.[0]}${user?.lastName?.[0]}`}</AvatarFallback>
          </Avatar>
        </div>

        <SidebarGroup className="flex-1">
          <div className="flex flex-col gap-2 items-center justify-center mb-4">
            <span className="text-xl font-semibold">{`${user?.firstName} ${user?.lastName}`}</span>
          </div>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link to={item.url} className="font-medium">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      {t(item.title)}
                    </SidebarMenuButton>
                  )}
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <Button className="m-2" onClick={() => mutate(null)}>
          {t("nav.logout")}
        </Button>
      </SidebarContent>
    </BaseSidebar>
  );
};
