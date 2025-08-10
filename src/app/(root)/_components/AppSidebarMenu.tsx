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

import { LinkIcon } from "lucide-react";

const items = [
  {
    title: "Links",
    url: "/links",
    icon: LinkIcon,
  },
];

const AppSidebarMenu = () => {
  const pathname = usePathname();

  return (
    <SidebarMenu className={cn("gap-3")}>
      {items.map((item) => (
        <SidebarMenuItem key={item.title} className="px-1">
          <SidebarMenuButton
            asChild
            className="hover:bg-s-secondary/10 hover:text-s-secondary">
            <Link
              href={item.url}
              className={cn(
                "flex items-center gap-2",
                pathname === item.url
                  ? "bg-s-secondary/10 text-s-secondary"
                  : ""
              )}>
              <item.icon />
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default AppSidebarMenu;
