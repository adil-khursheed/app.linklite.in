"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import {
  BarChart3Icon,
  FolderClosedIcon,
  GlobeIcon,
  LinkIcon,
  SquareArrowUpRightIcon,
  TagIcon,
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
};

const AppSidebarMenu = ({ items }: { items: ItemProps[] }) => {
  const pathname = usePathname();
  const workspace_slug = pathname.split("/")[1];

  return (
    <SidebarMenu className={cn("gap-2")}>
      {items.map((item) => {
        const Icon = icons[item.icon as keyof typeof icons];

        return (
          <SidebarMenuItem key={item.title} className="px-1">
            <SidebarMenuButton
              asChild
              isActive={pathname === `/${workspace_slug}${item.url}`}>
              <Link
                href={`/${workspace_slug}${item.url}`}
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
