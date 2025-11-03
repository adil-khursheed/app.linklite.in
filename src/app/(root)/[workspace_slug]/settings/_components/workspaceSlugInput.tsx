"use client";

import React from "react";
import { z } from "zod";
import WorkspaceSettingsCard from "./workspaceSettingsCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWorkspaceBySlug } from "@/app/(root)/_actions/getWorkspaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const WorkspaceSlugSchema = z.object({
  slug: z
    .string()
    .min(1, "Workspace slug is required")
    .max(48, "Workspace slug must be 48 characters or less")
    .lowercase(),
});

const WorkspaceSlugInput = () => {
  const params = useParams<{ workspace_slug: string }>();
  const { workspace_slug } = params;

  const { data } = useSuspenseQuery({
    queryKey: ["workspace", workspace_slug],
    queryFn: () => getWorkspaceBySlug(workspace_slug),
  });

  const form = useForm<z.infer<typeof WorkspaceSlugSchema>>({
    resolver: zodResolver(WorkspaceSlugSchema),
    defaultValues: {
      slug:
        data && data.workspace && data.workspace.slug
          ? data.workspace.slug
          : "",
    },
  });

  const slugWatched = form.watch("slug");
  const isDisabled = slugWatched === data.workspace.slug;

  const onSubmit = async (data: z.infer<typeof WorkspaceSlugSchema>) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Workspace slug update failed");
    }
  };
  return (
    <WorkspaceSettingsCard
      title="Workspace Slug"
      description="This is the unique identifier for your workspace on LinkLite.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="max-w-[50%] px-6">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter workspace slug"
                    className="w-full h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-between gap-3 py-4 px-6 bg-primary/5">
            <span className="text-muted-foreground text-sm">
              Only lowercase letters, numbers and dashes. Max 48 characters.
            </span>

            <Button type="submit" disabled={isDisabled || !slugWatched}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </WorkspaceSettingsCard>
  );
};

export default WorkspaceSlugInput;
