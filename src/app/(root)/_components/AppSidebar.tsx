import React, { Suspense } from "react";

import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AppSidebarContent from "./AppSidebarContent";
import AppWorkspaceButton from "./AppWorkspaceButton";
import { getAllWorkspaces } from "@/_actions/getWorkspaces";
import TotalLinksAndClicks from "./TotalLinksAndClicks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CogIcon, UserPlusIcon } from "lucide-react";

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
          <SidebarGroup className="py-0">
            <SidebarGroupLabel>General Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/settings">
                      <CogIcon />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/settings/people">
                      <UserPlusIcon />
                      <span>Invite People</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

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
