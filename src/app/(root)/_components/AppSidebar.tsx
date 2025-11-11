import React, { Suspense } from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import AppSidebarContent from "./AppSidebarContent";
import AppWorkspaceButton from "./AppWorkspaceButton";
import TotalLinksAndClicks from "./TotalLinksAndClicks";
import AppGeneralSettingsMenu from "./AppGeneralSettingsMenu";

import { getAllWorkspaces } from "@/_actions/getWorkspaces";

const AppSidebar = async ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["workspaces"],
      queryFn: getAllWorkspaces,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Sidebar {...props} className="group-data-[side=left]:border-0">
        <SidebarHeader>
          <Suspense fallback={null}>
            <AppWorkspaceButton />
          </Suspense>
        </SidebarHeader>

        <AppSidebarContent />

        <SidebarFooter>
          <Suspense>
            <AppGeneralSettingsMenu />
          </Suspense>

          <SidebarGroup className="py-0">
            <SidebarGroupLabel>Usage</SidebarGroupLabel>
            <SidebarGroupContent>
              <Suspense fallback={null}>
                <TotalLinksAndClicks />
              </Suspense>

              <Button className="w-full">Upgrade Plan</Button>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </HydrationBoundary>
  );
};

export default AppSidebar;
