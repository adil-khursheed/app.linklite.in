"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  SettingsIcon,
  UserPlusIcon,
} from "lucide-react";
import WorkspaceDialog from "./WorkspaceDialog";
import { getAllWorkspaces, getWorkspaceBySlug } from "@/_actions/getWorkspaces";

const AppWorkspaceButton = () => {
  const [open, setOpen] = useState(false);

  const { isMobile } = useSidebar();

  const params = useParams<{ workspace_slug?: string }>();

  const { data: workspace } = useQuery({
    queryKey: ["workspace", params.workspace_slug],
    queryFn: () => getWorkspaceBySlug(params.workspace_slug || ""),
    enabled: !!params.workspace_slug,
  });

  const { data: workspaces } = useSuspenseQuery({
    queryKey: ["workspaces"],
    queryFn: getAllWorkspaces,
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {params && params.workspace_slug ? (
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size={"lg"} className="cursor-pointer">
                <Avatar className="bg-primary rounded-[10px]">
                  <AvatarImage
                    src={workspace?.workspace.logo.url ?? undefined}
                  />
                  <AvatarFallback className="bg-transparent text-lg font-semibold text-neutral-100 capitalize">
                    {workspace?.workspace.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {workspace?.workspace.name}
                  </span>
                  <span className="truncate text-xs">
                    {workspace?.workspace.plan}
                  </span>
                </div>
                <ChevronsUpDownIcon className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={isMobile ? "bottom" : "right"}
              align={isMobile ? "end" : "start"}
              sideOffset={4}
              className="min-w-56 rounded-lg"
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Workspaces
              </DropdownMenuLabel>

              {workspaces.workspaces.length > 0
                ? workspaces.workspaces.map((item) => (
                    <DropdownMenuItem key={item._id} className="px-0">
                      <Button
                        asChild
                        variant={"ghost"}
                        className="w-full justify-start hover:bg-transparent"
                      >
                        <Link
                          href={`/${item.slug}/links`}
                          onClick={() => setOpen(false)}
                          className="flex w-full items-center justify-between"
                        >
                          <span className="flex flex-1 items-center gap-2">
                            <Avatar className="size-7 rounded-full">
                              <AvatarImage src={item.logo.url ?? undefined} />
                              <AvatarFallback className="rounded-full capitalize">
                                {item.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{item.name}</span>
                          </span>
                          {params.workspace_slug === item.slug && <CheckIcon />}
                        </Link>
                      </Button>
                    </DropdownMenuItem>
                  ))
                : null}

              <DropdownMenuSeparator />

              <WorkspaceDialog />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span>No Workspace</span>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AppWorkspaceButton;
