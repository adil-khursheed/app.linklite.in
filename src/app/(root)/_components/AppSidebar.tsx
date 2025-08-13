"use client";

import React from "react";

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
  colors,
  insightsMenuItems,
  libraryMenuItems,
  shortLinksMenuItems,
} from "@/lib/constants";
import UserButton from "./UserButton";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";

const AppSidebar = () => {
  const { user } = useAuthStore();

  return (
    <Sidebar className="mr-2 group-data-[side=left]:border-0">
      <div className="flex h-full">
        <div className="w-16 flex flex-col items-center justify-between my-2">
          <div className="size-12 flex justify-center items-center bg-s-secondary/5 rounded-full shadow">
            <Link href="/links" className="flex items-center font-bold gap-1">
              <LinkIcon className="size-5" color={colors["s-secondary"]} />
              <span className="sr-only">LinkLite</span>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <UserButton />
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-p-primary-light rounded-md shadow border border-p-primary-light my-2 px-1.5">
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
                <div className="flex items-center justify-between text-xs border-b pb-2 mt-3 mb-4">
                  <span className="flex items-center gap-1">
                    <LinkIcon size={10} />
                    Links
                  </span>

                  <span>0 of {user?.short_links_limit}</span>
                </div>
                <Button className="w-full">Upgrade Plan</Button>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarFooter>
        </div>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
