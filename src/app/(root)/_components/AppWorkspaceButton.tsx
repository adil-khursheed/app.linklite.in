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
import { useSidebar } from "@/components/ui/sidebar";
import { CheckIcon, SettingsIcon, UserPlusIcon } from "lucide-react";
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
    <>
      {params && params.workspace_slug && (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="size-10 flex justify-center items-center rounded-full shadow cursor-pointer">
              <Avatar>
                <AvatarImage src={workspace?.workspace.logo.url ?? undefined} />
                <AvatarFallback className="capitalize bg-transparent text-lg font-semibold">
                  {workspace?.workspace.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align={isMobile ? "end" : "start"}
            className="min-w-56 rounded-lg">
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-9 rounded-lg">
                  <AvatarImage
                    src={workspace?.workspace.logo.url ?? undefined}
                  />
                  <AvatarFallback className="rounded-lg capitalize">
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
              </div>
            </DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem className="px-0">
                <Button
                  asChild
                  variant={"ghost"}
                  className="hover:bg-transparent w-full justify-start">
                  <Link
                    href={`/${params.workspace_slug}/settings`}
                    onClick={() => setOpen(false)}>
                    <SettingsIcon />
                    <span>Settings</span>
                  </Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-0">
                <Button
                  asChild
                  variant={"ghost"}
                  className="hover:bg-transparent w-full justify-start">
                  <Link
                    href={`/${params.workspace_slug}/settings/people`}
                    onClick={() => setOpen(false)}>
                    <UserPlusIcon />
                    <span>Invite Members</span>
                  </Link>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">
                Workspaces
              </DropdownMenuLabel>
              {workspaces.workspaces.length > 0
                ? workspaces.workspaces.map((item) => (
                    <DropdownMenuItem key={item._id} className="px-0">
                      <Button
                        asChild
                        variant={"ghost"}
                        className="hover:bg-transparent w-full justify-start">
                        <Link
                          href={`/${item.slug}/links`}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between w-full">
                          <span className="flex items-center gap-2 flex-1">
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
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <WorkspaceDialog />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default AppWorkspaceButton;
