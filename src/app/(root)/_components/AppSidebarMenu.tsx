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

  return (
    <SidebarMenu className={cn("gap-2")}>
      {items.map((item) => {
        const Icon = icons[item.icon as keyof typeof icons];

        return (
          <SidebarMenuItem key={item.title} className="px-1">
            <SidebarMenuButton
              asChild
              className="hover:bg-s-secondary/10 hover:text-s-secondary">
              <Link
                href={item.url}
                className={cn(
                  "flex items-center gap-2 text-sm",
                  pathname === item.url
                    ? "bg-s-secondary/10 text-s-secondary"
                    : ""
                )}>
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
