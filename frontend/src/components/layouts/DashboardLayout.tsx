import { useEffect, type PropsWithChildren } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { SidebarProvider } from "../ui/sidebar";
import { initializePush } from "@/service-worker/register";
import { ThemeProvider } from "../ui/theme-provider";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    initializePush();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <SidebarProvider>
        <Sidebar />

        <div className="col-span-10 size-full max-h-[calc(100%-64px)] flex flex-col">
          <Header />
          <main className="flex-1 p-4 w-full h-full">{children}</main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};
