import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import Header from "@/components/ui/header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider className="p-2 bg-sidebar">
      <AppSidebar />
      <main className="flex-1 flex flex-col gap-y-2">
        <Header />
        <div className="flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
