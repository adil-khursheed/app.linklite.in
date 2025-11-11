"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { AnimatePresence, motion } from "motion/react";

import { ChevronLeft } from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import AppSidebarMenu from "./AppSidebarMenu";

import {
  insightsMenuItems,
  libraryMenuItems,
  shortLinksMenuItems,
  workspaceSettingsMenuItems,
} from "@/lib/constants";

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
          className="flex flex-1 flex-col overflow-y-auto [scrollbar-width:thin]"
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Short Links</SidebarGroupLabel>
              <SidebarGroupContent>
                <AppSidebarMenu items={shortLinksMenuItems} />
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Insights</SidebarGroupLabel>
              <SidebarGroupContent>
                <AppSidebarMenu items={insightsMenuItems} />
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
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
          className="flex flex-1 flex-col overflow-y-auto [scrollbar-width:thin]"
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
