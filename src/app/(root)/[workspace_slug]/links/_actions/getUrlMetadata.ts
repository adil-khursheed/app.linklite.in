"use server";

import kyInstance from "@/api-client/server-api-client";

export const getUrlMetadata = async (url: string) => {
  try {
    const res = await kyInstance.post("api/v1/urls/metadata/scrape", {
      json: { url },
    });

    return await res.json<{
      success: boolean;
      metadata: TUrlMetadata;
    }>();
  } catch (error) {
    console.error(error);
    throw new Error("Url metadata fetching failed");
  }
};
