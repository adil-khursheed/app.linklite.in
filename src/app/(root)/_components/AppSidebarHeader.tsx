"use client";

import React from "react";
import Link from "next/link";

import { LinkIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { colors } from "@/lib/constants";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";

const AppSidebarHeader = () => {
  const { state } = useSidebar();

  return (
    <SidebarHeader
      className={cn(
        "h-12 flex justify-center",
        state === "collapsed" ? "items-center" : "items-start"
      )}>
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-1 font-dyna-puff",
          state === "collapsed" ? "justify-center" : ""
        )}>
        <LinkIcon
          className={cn("size-5", state === "collapsed" ? "size-6" : "")}
          color={colors["s-secondary"]}
        />
        <span className={cn(" text-lg", state === "collapsed" ? "hidden" : "")}>
          LinkLite
        </span>
      </Link>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
