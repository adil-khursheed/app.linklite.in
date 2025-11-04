"use server";

import kyInstance from "@/api-client/server-api-client";
import { revalidateTag } from "next/cache";

export const updateWorkspace = async (
  data: { name?: string; slug?: string },
  existing_slug: string
) => {
  try {
    const res = await kyInstance.patch(
      `api/v1/workspaces/update/${existing_slug}`,
      {
        json: data,
      }
    );

    revalidateTag(`workspace:${existing_slug}`);
    revalidateTag(`all_workspaces`);

    return res.json<{
      success: boolean;
      message: string;
      workspace: TWorkspace;
    }>();
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error ? error.message : "Workspace updating failed"
    );
  }
};
