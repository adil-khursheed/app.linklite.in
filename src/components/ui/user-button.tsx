"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LogoutButton from "./logout-button";

import { useAuthStore } from "@/store/auth";

const UserButton = () => {
  const { user } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          <Avatar>
            <AvatarImage src={user?.avatar.url ?? undefined} />
            <AvatarFallback className="bg-card border-border border text-sm font-bold shadow">
              {user?.display_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="sr-only flex flex-col items-start sm:not-sr-only">
            <span className="text-sm font-medium">{user?.display_name}</span>
            <span className="text-xs">{user?.email}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar className="size-10 shadow">
            <AvatarImage src={user?.avatar.url ?? undefined} />
            <AvatarFallback className="bg-p-primary-light hover:bg-p-primary-light/90 text-s-secondary text-sm font-bold">
              {user?.display_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{user?.display_name}</p>
            <p>{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
