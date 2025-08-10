import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import { cookies } from "next/headers";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("_linklite_sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="p-2 bg-zinc-50">
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
};

export default Layout;
