"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useAuthStore } from "@/store/auth";

const UserButton = () => {
  const { user } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-9 rounded-full cursor-pointer shadow">
          <Avatar className="size-9">
            <AvatarFallback className="bg-p-primary-light hover:bg-p-primary-light/90 text-s-secondary font-bold text-sm">
              {user?.display_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar className="size-10 shadow">
            <AvatarFallback className="bg-p-primary-light hover:bg-p-primary-light/90 text-s-secondary font-bold text-sm">
              {user?.display_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{user?.display_name}</p>
            <p>{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center justify-between">
          <div>
            <span className="capitalize">{user?.category} Account</span>
          </div>
          {user?.category === "free" && (
            <Link href="/pricing">
              <Button className="cursor-pointer text-xs px-2.5 py-0.5">
                Upgrade
              </Button>
            </Link>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
