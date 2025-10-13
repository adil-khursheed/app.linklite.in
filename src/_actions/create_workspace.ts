"use server";

import kyInstance from "@/api-client/server-api-client";
import { revalidateTag } from "next/cache";

export const create_workspace = async (data: {
  name: string;
  slug: string;
}) => {
  try {
    const res = await kyInstance.post("api/v1/workspaces/create", {
      json: data,
    });

    const workspace_data = await res.json<{
      success: boolean;
      message: string;
      workspace: TWorkspace;
    }>();

    revalidateTag("current_user");
    revalidateTag("all_workspaces");
    return workspace_data;
  } catch (error) {
    console.error(error);
    throw new Error("Workspace creation failed");
  }
};
