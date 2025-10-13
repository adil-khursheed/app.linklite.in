"use client";

import { useQuery } from "@tanstack/react-query";
import { LinkIcon, MousePointerClickIcon } from "lucide-react";
import React from "react";
import { getWorkspaceBySlug } from "../_actions/getWorkspaces";
import { SlidingNumber } from "@/components/ui/sliding-number";
import { formatCompactNumber } from "@/lib/utils";
import { useParams } from "next/navigation";

const TotalLinksAndClicks = () => {
  const params = useParams<{ workspace_slug?: string }>();

  const { data: workspace } = useQuery({
    queryKey: ["workspace", params.workspace_slug],
    queryFn: () => getWorkspaceBySlug(params.workspace_slug || ""),
    enabled: !!params.workspace_slug,
  });

  return (
    <>
      <div className="flex items-center justify-between text-xs border-b border-border pb-2 mt-3 mb-4">
        <span className="flex items-center gap-1">
          <MousePointerClickIcon size={10} />
          Events
        </span>

        <div className="flex items-center gap-1">
          <SlidingNumber
            value={Number(
              formatCompactNumber(workspace?.workspace.total_clicks || 0)
            )}
          />
          <span>of</span>
          <span>
            {formatCompactNumber(workspace?.workspace.clicks_limit || 0)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs border-b border-border pb-2 mt-3 mb-4">
        <span className="flex items-center gap-1">
          <LinkIcon size={10} />
          Links
        </span>

        <div className="flex items-center gap-1">
          <SlidingNumber
            value={Number(
              formatCompactNumber(workspace?.workspace.links_created || 0)
            )}
          />
          <span>of</span>
          <span>
            {formatCompactNumber(workspace?.workspace.short_links_limit || 0)}
          </span>
        </div>
      </div>
    </>
  );
};

export default TotalLinksAndClicks;
