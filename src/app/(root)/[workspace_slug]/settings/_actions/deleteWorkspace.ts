"use server";

import kyInstance from "@/api-client/server-api-client";
import { HTTPError } from "ky";
import { revalidateTag } from "next/cache";

export const deleteWorkspace = async (workspace_slug: string) => {
  try {
    const res = await kyInstance.delete(
      `api/v1/workspaces/delete/${workspace_slug}`
    );

    revalidateTag("current_user");
    revalidateTag(`workspace:${workspace_slug}`);
    revalidateTag("workspaces");

    return await res.json<{ success: boolean; message: string }>();
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof HTTPError ? error.message : "Workspace deletion failed"
    );
  }
};
