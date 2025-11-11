"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { CogIcon, UserPlusIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const AppGeneralSettingsMenu = () => {
  const params = useParams<{ workspace_slug?: string }>();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>General Settings</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={`/${params?.workspace_slug}/settings`}>
                <CogIcon />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={`/${params?.workspace_slug}/settings/people`}>
                <UserPlusIcon />
                <span>Invite People</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AppGeneralSettingsMenu;
