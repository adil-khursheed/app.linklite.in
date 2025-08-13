"use client";

import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

interface ItemProps {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const AppSidebarMenu = ({ items }: { items: ItemProps[] }) => {
  const pathname = usePathname();

  return (
    <SidebarMenu className={cn("gap-2")}>
      {items.map((item) => (
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
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default AppSidebarMenu;
