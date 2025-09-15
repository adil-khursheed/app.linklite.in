import React, { Suspense } from "react";
import DialogWrapper from "./_components/DialogWrapper";
import type { Metadata } from "next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import EmptyList from "@/components/ui/empty-list";
import { CreateLinkDialogProvider } from "@/contexts/createLinkDialogContext";
import CreateLinksButton from "../_components/CreateLinksButton";

export const metadata: Metadata = {
  title: "Links",
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const urlParams = await searchParams;
  const { url } = urlParams;

  return (
    <CreateLinkDialogProvider>
      <section className="px-3 py-5 sm:p-5 bg-white rounded-md h-[calc(100vh-16px)] shadow border border-border flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="cursor-pointer md:hidden" />

            <h2 className="text-xl sm:text-2xl font-bold">
              Bridge For Your Connections
            </h2>
          </div>

          <CreateLinksButton />
        </div>

        <div className="flex-1 flex items-center justify-center border border-border rounded-sm">
          <div className="flex flex-col items-center gap-4 w-full">
            <EmptyList />
            <CreateLinksButton />
          </div>
        </div>

        {url && (
          <Suspense>
            <DialogWrapper url={url as string} />
          </Suspense>
        )}
      </section>
    </CreateLinkDialogProvider>
  );
};

export default Page;
