"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import EmptyList from "@/components/ui/empty-list";
import { getShortLinks } from "../_actions/getShortLinks";
import CreateLinksButton from "./CreateLinksButton";
import { Card, CardContent } from "@/components/ui/card";
import {
  CopyIcon,
  CornerDownRightIcon,
  EditIcon,
  EllipsisVerticalIcon,
  QrCodeIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeHttpAndWww } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const LinksList = () => {
  const { isMobile } = useSidebar();

  const params = useParams<{ workspace_slug: string }>();
  const { workspace_slug } = params;

  const router = useRouter();

  const { data } = useSuspenseQuery({
    queryKey: ["urls", workspace_slug],
    queryFn: () => getShortLinks(workspace_slug),
  });

  return (
    <>
      {data.urls && data.urls.length > 0 ? (
        <div className="h-full w-full p-4 space-y-4 overflow-y-auto [scrollbar-width:thin]">
          {data.urls.map((url) => (
            <Card
              key={url._id}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/${workspace_slug}/links/${url._id}`);
              }}
              className="rounded w-full py-3">
              <CardContent className="w-full flex items-center justify-between gap-3">
                <div className="flex-1 flex items-center gap-3 min-w-0">
                  {url.link_metadata && url.link_metadata.favicon ? (
                    <Avatar className="size-7 rounded-full flex items-center justify-center border border-border shrink-0">
                      <AvatarImage
                        src={url.link_metadata.favicon}
                        className="size-5 rounded-full object-contain"
                      />
                    </Avatar>
                  ) : null}

                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium flex items-center gap-5">
                      <Link
                        href={`${url.domain}/${url.short_link_id}`}
                        onClick={(e) => e.stopPropagation()}
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

                    <div className="min-w-0 w-full flex items-center gap-3 text-[13px] text-secondary-foreground px-2">
                      <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                        <CornerDownRightIcon
                          className="text-border shrink-0"
                          size={16}
                        />

                        <Link
                          href={url.destination_url}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          className="hover:underline flex-1 min-w-0">
                          <span className="w-full truncate">
                            {removeHttpAndWww(url.destination_url)}
                          </span>
                        </Link>
                      </div>

                      <Avatar className="size-5">
                        <AvatarImage
                          src={url.created_by.avatar.url || undefined}
                          alt={`${url.created_by.display_name}'s avatar`}
                        />
                        <AvatarFallback>
                          {url.created_by.display_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="text-xs text-secondary-foreground">
                        <span className="whitespace-nowrap">
                          {formatDate(url.created_at, "MMM dd")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {url.tags && url.tags.length > 0 ? (
                    <Badge className="bg-primary/10 text-primary rounded-md p-2 text-sm flex items-center gap-2">
                      <TagIcon size={14} />
                      {url.tags[0].name}
                      {url.tags.length >= 2 && (
                        <span className="border-l border-border pl-2">
                          +{url.tags.length - 1}
                        </span>
                      )}
                    </Badge>
                  ) : null}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-pointer">
                        <EllipsisVerticalIcon size={15} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-24 rounded-lg"
                      side="bottom"
                      align={isMobile ? "end" : "start"}>
                      <DropdownMenuItem>
                        <EditIcon />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <QrCodeIcon />
                        <span>QR Code</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2Icon />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
