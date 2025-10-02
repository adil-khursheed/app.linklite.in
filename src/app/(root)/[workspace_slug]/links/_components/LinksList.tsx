"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import EmptyList from "@/components/ui/empty-list";
import { getShortLinks } from "../_actions/getShortLinks";
import CreateLinksButton from "./CreateLinksButton";
import { Card, CardContent } from "@/components/ui/card";
import {
  CopyIcon,
  CornerDownRightIcon,
  EllipsisVerticalIcon,
  TagIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeHttpAndWww } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LinksList = () => {
  const params = useParams<{ workspace_slug: string }>();
  const { workspace_slug } = params;

  const { data } = useSuspenseQuery({
    queryKey: ["urls", workspace_slug],
    queryFn: () => getShortLinks(workspace_slug),
  });

  return (
    <>
      {data.urls && data.urls.length > 0 ? (
        <div className="h-full w-full p-4 space-y-4 overflow-y-auto [scrollbar-width:thin]">
          {data.urls.map((url) => (
            <Card key={url._id} className="rounded w-full">
              <CardContent className="w-full flex items-center justify-between gap-3">
                <div className="w-full flex items-center gap-3">
                  {url.link_metadata && url.link_metadata.favicon ? (
                    <Avatar className="size-7 rounded-full flex items-center justify-center border border-border">
                      <AvatarImage
                        src={url.link_metadata.favicon}
                        className="size-5 rounded-full object-contain"
                      />
                    </Avatar>
                  ) : null}

                  <div className="w-full">
                    <div className="text-[15px] font-medium flex items-center gap-5">
                      <Link
                        href={`${url.domain}/${url.short_link_id}`}
                        target="_blank">
                        {removeHttpAndWww(url.domain)}/{url.short_link_id}
                      </Link>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="cursor-pointer">
                        <CopyIcon />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3 text-[13px] text-secondary-foreground px-2">
                      <CornerDownRightIcon className="text-border" size={16} />

                      <Link
                        href={url.destination_url}
                        target="_blank"
                        className="hover:underline flex-1">
                        {removeHttpAndWww(url.destination_url)}
                        ssssssssssssssssss-ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss-ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                      </Link>

                      <Avatar className="size-5">
                        <AvatarImage
                          src={url.created_by.avatar.url || undefined}
                          alt={`${url.created_by.display_name}'s avatar`}
                        />
                        <AvatarFallback>
                          {url.created_by.display_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <span className="whitespace-nowrap">
                          {formatDate(url.created_at, "MMM dd")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {url.tags && url.tags.length > 0 ? (
                    <div className="bg-primary/10 text-primary rounded-md p-2 text-sm flex items-center gap-2">
                      <TagIcon size={14} />
                      {url.tags[0].name}
                      {url.tags.length >= 2 && (
                        <span className="border-l border-border pl-2">
                          +{url.tags.length - 1}
                        </span>
                      )}
                    </div>
                  ) : null}

                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="cursor-pointer">
                    <EllipsisVerticalIcon size={15} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 w-full">
            <EmptyList />
            <CreateLinksButton />
          </div>
        </div>
      )}
    </>
  );
};

export default LinksList;
