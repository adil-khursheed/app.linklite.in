import React, { Suspense } from "react";
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import WorkspaceNameInput from "./_components/workspaceNameInput";
import WorkspaceSlugInput from "./_components/workspaceSlugInput";
import DeleteWorkspace from "./_components/deleteWorkspace";
import Container from "@/components/ui/container";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getWorkspaceBySlug } from "@/_actions/getWorkspaces";

export const metadata: Metadata = {
  title: "General Settings",
};

const Page = async ({
  params,
}: {
  params: Promise<{ workspace_slug: string }>;
}) => {
  const { workspace_slug } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["workspace", workspace_slug],
    queryFn: () => getWorkspaceBySlug(workspace_slug),
  });

  return (
    <Container className="px-1 md:px-3">
      <div className="mx-auto h-full w-full max-w-6xl space-y-5 px-3">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <WorkspaceNameInput />
          </Suspense>

          <Suspense>
            <WorkspaceSlugInput />
          </Suspense>

          <Suspense>
            <DeleteWorkspace />
          </Suspense>
        </HydrationBoundary>
      </div>
    </Container>
  );
};

export default Page;
