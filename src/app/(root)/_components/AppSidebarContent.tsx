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
          className="flex h-full flex-col"
        >
          <SidebarContent>
            <SidebarGroup className="py-0">
              <SidebarGroupLabel>Short Links</SidebarGroupLabel>
              <SidebarGroupContent>
                <AppSidebarMenu items={shortLinksMenuItems} />
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="py-0">
              <SidebarGroupLabel>Insights</SidebarGroupLabel>
              <SidebarGroupContent>
                <AppSidebarMenu items={insightsMenuItems} />
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="py-0">
              <SidebarGroupLabel>Library</SidebarGroupLabel>
              <SidebarGroupContent>
                <AppSidebarMenu items={libraryMenuItems} />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </motion.div>
      ) : params.workspace_slug &&
        pathname.startsWith(`/${params.workspace_slug}/settings`) ? (
        <motion.div
          key={"item-2"}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="flex h-full flex-col"
        >
          <SidebarHeader>
            <Button
              asChild
              variant={"ghost"}
              className="w-full justify-start text-base font-semibold"
            >
              <Link href={`/${params.workspace_slug}/links`}>
                <ChevronLeft size={16} />
                <span>Settings</span>
              </Link>
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
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
