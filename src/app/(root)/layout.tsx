import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import { cookies } from "next/headers";
import Header from "./_components/Header";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("_linklite_sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex-1">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
