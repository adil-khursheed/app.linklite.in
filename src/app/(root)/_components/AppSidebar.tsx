import React from "react";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import AppSidebarMenu from "./AppSidebarMenu";
import AppSidebarHeader from "./AppSidebarHeader";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />

      <SidebarContent className="pt-5">
        <AppSidebarMenu />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
