"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkIcon, MousePointerClickIcon } from "lucide-react";
import React from "react";
import { getWorkspaceBySlug } from "../_actions/getWorkspaces";
import { SlidingNumber } from "@/components/ui/sliding-number";
import { formatCompactNumber } from "@/lib/utils";
import { useParams } from "next/navigation";

const TotalLinksAndClicks = () => {
  const { workspace_slug } = useParams<{ workspace_slug?: string }>();

  const { data: workspace } = useSuspenseQuery({
    queryKey: ["workspace", workspace_slug],
    queryFn: () => getWorkspaceBySlug(workspace_slug || ""),
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
              formatCompactNumber(workspace.workspace.total_clicks)
            )}
          />
          <span>of</span>
          <span>{formatCompactNumber(workspace.workspace.clicks_limit)}</span>
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
              formatCompactNumber(workspace.workspace.links_created)
            )}
          />
          <span>of</span>
          <span>
            {formatCompactNumber(workspace.workspace.short_links_limit)}
          </span>
        </div>
      </div>
    </>
  );
};

export default TotalLinksAndClicks;
