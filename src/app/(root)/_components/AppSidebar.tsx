import React, { Suspense } from "react";

import { Sidebar } from "@/components/ui/sidebar";

import Link from "next/link";
import { LinkIcon } from "lucide-react";
import UserButton from "./UserButton";
import { Button } from "@/components/ui/button";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AppSidebarContent from "./AppSidebarContent";
import AppWorkspaceButton from "./AppWorkspaceButton";
import { getAllWorkspaces } from "@/_actions/getWorkspaces";

const AppSidebar = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["workspaces"],
      queryFn: getAllWorkspaces,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Sidebar className="mr-2 group-data-[side=left]:border-0">
        <div className="flex h-full">
          <div className="w-16 flex flex-col items-center justify-between my-2">
            <div className="gap-y-5 flex flex-col items-center">
              <Button
                asChild
                variant={"ghost"}
                size={"icon"}
                className="size-12 flex justify-center items-center rounded-full shadow text-primary hover:text-primary">
                <Link href="/">
                  <LinkIcon className="size-5" />
                  <span className="sr-only">LinkLite</span>
                </Link>
              </Button>

              <Suspense fallback={null}>
                <AppWorkspaceButton />
              </Suspense>
            </div>

            <div className="flex items-center justify-center">
              <UserButton />
            </div>
          </div>

          <div className="flex-1 bg-secondary rounded-md shadow border border-border my-2 px-1.5 overflow-hidden">
            <AppSidebarContent />
          </div>
        </div>
      </Sidebar>
    </HydrationBoundary>
  );
};

export default AppSidebar;
