"use client";

import { getWorkspaceBySlug } from "@/app/(root)/_actions/getWorkspaces";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import WorkspaceSettingsCard from "./workspaceSettingsCard";

const WorkspaceNameSchema = z.object({
  name: z
    .string()
    .min(1, "Workspace name is required")
    .max(32, "Workspace name must be 32 characters or less"),
});

const WorkspaceNameInput = () => {
  const params = useParams<{ workspace_slug: string }>();
  const { workspace_slug } = params;

  const { data } = useSuspenseQuery({
    queryKey: ["workspace", workspace_slug],
    queryFn: () => getWorkspaceBySlug(workspace_slug),
  });

  const form = useForm<z.infer<typeof WorkspaceNameSchema>>({
    resolver: zodResolver(WorkspaceNameSchema),
    defaultValues: {
      name:
        data && data.workspace && data.workspace.name
          ? data.workspace.name
          : "",
    },
  });

  const nameWatched = form.watch("name");
  const isDisabled = nameWatched === data.workspace.name;

  const onSubmit = async (data: z.infer<typeof WorkspaceNameSchema>) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update workspace name.");
    }
  };

  return (
    <WorkspaceSettingsCard
      title="Workspace Name"
      description="This is the name of your workspace on LinkLite.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="max-w-[50%] px-6">
                <FormControl>
                  <Input {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-between h-14 px-6 bg-primary/5">
            <span className="text-muted-foreground text-sm">
              Max 32 characters.
            </span>

            <Button type="submit" disabled={isDisabled || !nameWatched}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </WorkspaceSettingsCard>
  );
};

export default WorkspaceNameInput;
