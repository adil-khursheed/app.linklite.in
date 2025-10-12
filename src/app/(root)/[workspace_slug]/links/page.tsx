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
          <section className="px-3 py-5 sm:p-5 bg-white rounded-md h-[calc(100vh-16px)] shadow border border-border">
            <div className="max-w-6xl w-full h-full mx-auto flex flex-col gap-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="cursor-pointer md:hidden" />

                  <h2 className="text-xl sm:text-2xl font-bold">
                    Bridge For Your Connections
                  </h2>
                </div>

                <CreateLinksButton />
              </div>

              <div className="flex-1 border border-border rounded-sm overflow-hidden">
                <LinksList />
              </div>
            </div>
          </section>
        </CreateLinkDialogProvider>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
