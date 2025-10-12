"use server";

import kyInstance from "@/api-client/server-api-client";

export const getAllWorkspaces = async () => {
  try {
    const res = await kyInstance.get(`api/v1/workspaces/get`, {
      cache: "force-cache",
      next: {
        tags: [`all_workspaces`],
      },
    });

    return res.json<{
      success: boolean;
      message: string;
      workspaces: TWorkspace[];
    }>();
  } catch (error) {
    console.error(error);
    throw new Error("Fetching workspaces failed");
  }
};

export const getWorkspaceBySlug = async (slug: string) => {
  try {
    const res = await kyInstance.get(`api/v1/workspaces/get/${slug}`, {
      cache: "force-cache",
      next: {
        tags: [`workspace:${slug}`],
      },
    });

    return res.json<{
      success: boolean;
      message: string;
      workspace: TWorkspace;
    }>();
  } catch (error) {
    console.error(error);
    throw new Error("Fetching workspaces failed");
  }
};
