import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import AppSidebarMenu from "./AppSidebarMenu";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { colors } from "@/lib/constants";
import UserButton from "./UserButton";

const AppSidebar = () => {
  return (
    <Sidebar className="mr-2 group-data-[side=left]:border-0">
      <div className="flex h-full">
        <div className="w-16 flex flex-col items-center justify-between my-2">
          <div className="size-12 flex justify-center items-center bg-s-secondary/5 rounded-full shadow">
            <Link
              href="/dashboard"
              className="flex items-center font-bold gap-1">
              <LinkIcon className="size-5" color={colors["s-secondary"]} />
              <span className="sr-only">LinkLite</span>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <UserButton />
          </div>
        </div>
        <div className="flex-1 bg-p-primary-light rounded-md shadow border border-p-primary-light my-2">
          <SidebarContent>
            <SidebarHeader className="font-semibold text-base">
              Short Links
            </SidebarHeader>
            <AppSidebarMenu />
          </SidebarContent>
        </div>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
