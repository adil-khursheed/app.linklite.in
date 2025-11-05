"use server";

import kyInstance from "@/api-client/server-api-client";
import { revalidateTag } from "next/cache";

interface IShortenLinkProps {
  workspace_slug: string;
  destination_url: string;
  short_link_id: string;
  domain: string;
  tags?: string[];
  comment?: string;
  url_metadata: {
    title?: string;
    description?: string;
    image?: string;
    favicon?: string;
  };
}

export const shortenLink = async ({
  destination_url,
  domain,
  short_link_id,
  url_metadata,
  workspace_slug,
  comment,
  tags,
}: IShortenLinkProps) => {
  try {
    const res = await kyInstance.post(`api/v1/urls/create/${workspace_slug}`, {
      json: {
        destination_url,
        domain,
        short_link_id,
        url_metadata,
        comment,
        tags,
      },
    });

    const data = await res.json<{
      message: string;
      success: boolean;
      url: TShortLink;
    }>();

    revalidateTag(`urls:${workspace_slug}`);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Url shortening failed");
  }
};
