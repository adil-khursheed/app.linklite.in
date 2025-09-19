"use client";

import React from "react";
import Link from "next/link";

import { LinkIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { SidebarHeader } from "@/components/ui/sidebar";

const AppSidebarHeader = () => {
  return (
    <SidebarHeader className={cn("h-12 flex justify-center")}>
      <Link
        href="/dashboard"
        className={cn("flex items-center gap-1 font-dyna-puff")}>
        <LinkIcon className={cn("size-5 text-primary")} />
        <span className={cn("text-lg")}>LinkLite</span>
      </Link>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
