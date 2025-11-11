import React, { Suspense } from "react";
import type { Metadata } from "next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreateLinkDialogProvider } from "@/contexts/createLinkDialogContext";
import CreateLinksButton from "./_components/CreateLinksButton";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTags } from "../_actions/getTags";
import { getShortLinks } from "./_actions/getShortLinks";
import LinksList from "./_components/LinksList";
import Container from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Links",
};

const Page = async ({
  params,
}: {
  params: Promise<{ workspace_slug: string }>;
}) => {
  const { workspace_slug } = await params;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["tags", workspace_slug],
      queryFn: () => getTags(workspace_slug),
    }),
    queryClient.prefetchQuery({
      queryKey: ["urls", workspace_slug],
      queryFn: () => getShortLinks(workspace_slug),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <CreateLinkDialogProvider>
          <Container>
            <div className="flex h-full w-full flex-col gap-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold sm:text-2xl">
                    Bridge For Your Connections
                  </h2>
                </div>

                <CreateLinksButton />
              </div>

              <div className="border-border flex-1 overflow-hidden rounded-sm border">
                <LinksList />
              </div>
            </div>
          </Container>
        </CreateLinkDialogProvider>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
