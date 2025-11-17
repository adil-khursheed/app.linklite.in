import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ErrorBoundary } from "react-error-boundary";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Loader2Icon } from "lucide-react";

import { InviteMemberDialogProvider } from "@/contexts/inviteMemberDialogContext";

import Container from "@/components/ui/container";
import InviteMembersButton from "./_components/InviteMembersButton";
import MembersList from "./_components/MembersList";

import { getWorkspaceMembers } from "./_actions/getWorkspaceMembers";

export const metadata: Metadata = {
  title: "Members",
};

const Page = async ({
  params,
}: {
  params: Promise<{ workspace_slug: string }>;
}) => {
  const { workspace_slug } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["team-members", workspace_slug],
    queryFn: () => getWorkspaceMembers(workspace_slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InviteMemberDialogProvider>
        <Container>
          <div className="flex h-full w-full flex-col gap-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">Team Members</h2>
              </div>

              <InviteMembersButton />
            </div>

            <ErrorBoundary
              fallback={
                <div className="flex flex-1 items-center justify-center">
                  <span className="text-muted-foreground text-center text-sm font-medium">
                    Something went wrong!
                  </span>
                </div>
              }
            >
              <Suspense
                fallback={
                  <div className="flex flex-1 items-center justify-center">
                    <Loader2Icon className="text-muted-foreground size-10 animate-spin" />
                  </div>
                }
              >
                <MembersList />
              </Suspense>
            </ErrorBoundary>
          </div>
        </Container>
      </InviteMemberDialogProvider>
    </HydrationBoundary>
  );
};

export default Page;
