import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider className="p-2 bg-sidebar">
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
};

export default Layout;
