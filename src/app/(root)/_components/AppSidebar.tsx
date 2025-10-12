import React, { Suspense } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";

import AppSidebarMenu from "./AppSidebarMenu";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import {
  insightsMenuItems,
  libraryMenuItems,
  shortLinksMenuItems,
} from "@/lib/constants";
import UserButton from "./UserButton";
import { Button } from "@/components/ui/button";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  getAllWorkspaces,
  getWorkspaceBySlug,
} from "../_actions/getWorkspaces";
import { getUser } from "@/data/getUser";
import TotalLinksAndClicks from "./TotalLinksAndClicks";

const AppSidebar = async () => {
  const { user } = await getUser();

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["workspaces"],
      queryFn: getAllWorkspaces,
    }),
    queryClient.prefetchQuery({
      queryKey: ["workspace", user.default_workspace],
      queryFn: () => getWorkspaceBySlug(user.default_workspace),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Sidebar className="mr-2 group-data-[side=left]:border-0">
        <div className="flex h-full">
          <div className="w-16 flex flex-col items-center justify-between my-2">
            <div className="size-12 flex justify-center items-center bg-secondary rounded-full shadow">
              <Link
                href="/"
                className="flex items-center font-bold gap-1 text-primary">
                <LinkIcon className="size-5" />
                <span className="sr-only">LinkLite</span>
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <UserButton />
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-secondary rounded-md shadow border border-border my-2 px-1.5">
            <SidebarContent>
              <SidebarHeader className="font-semibold text-base">
                Short Links
              </SidebarHeader>
              <SidebarGroup className="px-0">
                <SidebarGroupContent>
                  <AppSidebarMenu items={shortLinksMenuItems} />
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="px-0">
                <SidebarGroupLabel>Insights</SidebarGroupLabel>
                <SidebarGroupContent>
                  <AppSidebarMenu items={insightsMenuItems} />
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="px-0">
                <SidebarGroupLabel>Library</SidebarGroupLabel>
                <SidebarGroupContent>
                  <AppSidebarMenu items={libraryMenuItems} />
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="mt-auto">
              <SidebarGroup className="px-0">
                <SidebarGroupLabel className="px-0">Usage</SidebarGroupLabel>
                <SidebarGroupContent>
                  <Suspense fallback={null}>
                    <TotalLinksAndClicks />
                  </Suspense>

                  <Button className="w-full">Upgrade Plan</Button>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarFooter>
          </div>
        </div>
      </Sidebar>
    </HydrationBoundary>
  );
};

export default AppSidebar;
