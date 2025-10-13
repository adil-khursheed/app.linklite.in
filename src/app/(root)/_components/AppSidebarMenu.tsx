"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import {
  BarChart3Icon,
  CogIcon,
  FolderClosedIcon,
  GlobeIcon,
  LinkIcon,
  SquareArrowUpRightIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";

interface ItemProps {
  title: string;
  url: string;
  icon: string;
}

const icons = {
  LinkIcon,
  GlobeIcon,
  BarChart3Icon,
  FolderClosedIcon,
  TagIcon,
  SquareArrowUpRightIcon,
  CogIcon,
  UsersIcon,
};

const AppSidebarMenu = ({ items }: { items: ItemProps[] }) => {
  const pathname = usePathname();
  const params = useParams<{ workspace_slug?: string }>();

  return (
    <SidebarMenu className={cn("gap-2")}>
      {items.map((item) => {
        const Icon = icons[item.icon as keyof typeof icons];

        return (
          <SidebarMenuItem key={item.title} className="px-1">
            <SidebarMenuButton
              asChild
              isActive={pathname === `/${params?.workspace_slug}${item.url}`}>
              <Link
                href={`/${params?.workspace_slug}${item.url}`}
                className={cn("flex items-center gap-2 text-sm")}>
                <Icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default AppSidebarMenu;
