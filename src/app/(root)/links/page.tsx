import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import UrlShortenerForm from "./_components/UrlShortenerForm";

import { shortenLink } from "./_actions/shortenLink";
import Description from "./_components/Description";
import DialogWrapper from "./_components/DialogWrapper";
import type { Metadata } from "next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import CreateLinksButton from "../_components/CreateLinksButton";
import EmptyList from "@/components/ui/empty-list";

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

  let urlData: TShortLink | undefined;

  if (url && !urlData) {
    const data = await shortenLink(decodeURIComponent(url as string));
    urlData = data.url;
  }

  return (
    <section className="px-3 py-5 sm:p-5 bg-white rounded-md h-[calc(100vh-16px)] shadow border border-p-primary-light flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="cursor-pointer md:hidden" />
          <h2 className="text-xl sm:text-2xl font-bold">
            Bridge For Your Connections
          </h2>
        </div>

        <CreateLinksButton />
      </div>

      <div className="flex-1 flex items-center justify-center border rounded-sm">
        <div className="flex flex-col items-center gap-4 w-full">
          <EmptyList />
          <CreateLinksButton />
        </div>
      </div>
      {/* <Card className="mt-8 bg-p-primary-light border-p-primary-light">
        <CardHeader>
          <CardTitle className="text-p-primary text-xl sm:text-2xl">
            Lighten your long link
          </CardTitle>
          <Description />
        </CardHeader>

        <CardContent>
          <UrlShortenerForm />
        </CardContent>
      </Card> */}

      {urlData && <DialogWrapper data={urlData} />}
    </section>
  );
};

export default Page;
