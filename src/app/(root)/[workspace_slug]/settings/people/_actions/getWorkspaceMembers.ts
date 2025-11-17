"use server";

import kyInstance from "@/api-client/server-api-client";

export const getWorkspaceMembers = async (workspace_slug: string) => {
  try {
    const res = await kyInstance.get(
      `api/v1/memberships/${workspace_slug}/members`,
      {
        cache: "force-cache",
        next: {
          tags: [`team-members:${workspace_slug}`],
        },
      },
    );

    return await res.json<{
      success: boolean;
      message: string;
      members: TWorkspaceMembership[];
    }>();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get workspace members");
  }
};
