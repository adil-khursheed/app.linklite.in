"use server";

import kyInstance from "@/api-client/server-api-client";

export const getTags = async (workspace_slug: string) => {
  try {
    const res = await kyInstance.get(`api/v1/tags/get/${workspace_slug}`, {
      cache: "force-cache",
      next: {
        tags: [`tags:${workspace_slug}`],
      },
    });

    return await res.json<{
      success: boolean;
      message: string;
      tags: TTag[];
    }>();
  } catch (error) {
    console.error(error);
    throw new Error("Fetching tags failed");
  }
};
