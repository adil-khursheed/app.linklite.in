"use server";

import kyInstance from "@/api-client/server-api-client";
import { revalidateTag } from "next/cache";

export const createTag = async ({
  name,
  workspace_slug,
}: {
  name: string;
  workspace_slug: string;
}) => {
  try {
    const res = await kyInstance.post("api/v1/tags/create", {
      json: {
        name,
        workspace_slug,
      },
    });

    const data = await res.json<{
      success: boolean;
      message: string;
      tag: TTag;
    }>();

    revalidateTag(`tags:${workspace_slug}`);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Creating tag failed");
  }
};
