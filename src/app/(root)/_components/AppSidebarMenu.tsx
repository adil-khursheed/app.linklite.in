"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

import { HomeIcon, LinkIcon, QrCodeIcon, SettingsIcon } from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Links",
    url: "/links",
    icon: LinkIcon,
  },
  {
    title: "QR Code",
    url: "/qr-code",
    icon: QrCodeIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: SettingsIcon,
  },
];

const AppSidebarMenu = () => {
  const { state } = useSidebar();

  const pathname = usePathname();

  return (
    <SidebarMenu
      className={cn("gap-3", state === "collapsed" ? "items-center" : "")}>
      {items.map((item) => (
        <SidebarMenuItem key={item.title} className="px-1">
          <SidebarMenuButton
            asChild
            className="hover:bg-s-secondary/90 hover:text-white">
            <Link
              href={item.url}
              className={cn(
                "flex items-center gap-2",
                pathname === item.url ? "bg-s-secondary text-white" : ""
              )}>
              <item.icon />
              <span className="text-base font-medium">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default AppSidebarMenu;
