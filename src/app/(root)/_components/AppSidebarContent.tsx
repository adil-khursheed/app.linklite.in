"use client";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useParams, usePathname } from "next/navigation";
import React, { Suspense } from "react";
import AppSidebarMenu from "./AppSidebarMenu";
import {
  insightsMenuItems,
  libraryMenuItems,
  shortLinksMenuItems,
  workspaceSettingsMenuItems,
} from "@/lib/constants";
import TotalLinksAndClicks from "./TotalLinksAndClicks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const AppSidebarContent = () => {
  const pathname = usePathname();
  const params = useParams<{ workspace_slug?: string }>();

  return (
    <AnimatePresence>
      {params.workspace_slug &&
      !pathname.startsWith(`/${params.workspace_slug}/settings`) ? (
        <motion.div
          key={"item-1"}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="h-full flex flex-col">
          <SidebarHeader className="font-semibold text-base">
            Short Links
          </SidebarHeader>
          <SidebarContent>
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
        </motion.div>
      ) : params.workspace_slug &&
        pathname.startsWith(`/${params.workspace_slug}/settings`) ? (
        <motion.div
          key={"item-2"}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="h-full flex flex-col">
          <SidebarHeader>
            <Button
              asChild
              variant={"ghost"}
              className="w-full justify-start text-base font-semibold">
              <Link href={`/${params.workspace_slug}/links`}>
                <ChevronLeft size={16} />
                <span>Settings</span>
              </Link>
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="px-0">
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <AppSidebarMenu items={workspaceSettingsMenuItems} />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </motion.div>
      ) : (
        <div></div>
      )}
    </AnimatePresence>
  );
};

export default AppSidebarContent;
