import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import UrlShortenerForm from "./_components/UrlShortenerForm";

import { shortenLink } from "./_actions/shortenLink";
import Description from "./_components/Description";
import DialogWrapper from "./_components/DialogWrapper";

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
    <section className="px-3 py-5 sm:p-5 max-w-4xl w-full mx-auto">
      <h2 className="text-xl sm:text-3xl font-bold">
        Bridge For Your Connections
      </h2>

      <Card className="mt-8 bg-p-primary-light border-p-primary-light">
        <CardHeader>
          <CardTitle className="text-p-primary text-xl sm:text-2xl">
            Lighten your long link
          </CardTitle>
          <Description />
        </CardHeader>

        <CardContent>
          <UrlShortenerForm />
        </CardContent>
      </Card>

      {urlData && <DialogWrapper data={urlData} />}
    </section>
  );
};

export default Page;
