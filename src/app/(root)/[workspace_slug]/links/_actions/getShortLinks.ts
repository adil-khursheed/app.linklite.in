"use server";

import kyInstance from "@/api-client/server-api-client";

export const getShortLinks = async (workspace_slug: string) => {
  try {
    const res = await kyInstance.get(`api/v1/urls/get/${workspace_slug}`, {
      cache: "force-cache",
      next: {
        tags: [`urls:${workspace_slug}`],
      },
    });

    return await res.json<{
      success: boolean;
      message: string;
      urls: TShortLink[];
    }>();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get short links");
  }
};
