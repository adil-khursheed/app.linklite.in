"use client";

import React, { useState } from "react";
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
import { useParams, useRouter } from "next/navigation";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getWorkspaceBySlug } from "@/_actions/getWorkspaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateWorkspace } from "../_actions/updateWorkspace";
import { Loader2Icon } from "lucide-react";

const WorkspaceSlugSchema = z.object({
  slug: z
    .string()
    .min(1, "Workspace slug is required")
    .max(48, "Workspace slug must be 48 characters or less")
    .lowercase(),
});

const WorkspaceSlugInput = () => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();
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

  const queryClient = useQueryClient();

  const onSubmit = async (data: z.infer<typeof WorkspaceSlugSchema>) => {
    try {
      setIsPending(true);

      const res = await updateWorkspace(data, workspace_slug);
      if (res.success) {
        router.replace(`/${res.workspace.slug}/settings`);
        toast.success("Workspace slug updated successfully.");
        form.reset({ slug: res.workspace.slug });
        queryClient.invalidateQueries({
          queryKey: ["workspaces"],
        });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Workspace slug update failed");
    } finally {
      setIsPending(false);
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

            <Button
              type="submit"
              disabled={isDisabled || !slugWatched || isPending}
              className="cursor-pointer">
              {isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </WorkspaceSettingsCard>
  );
};

export default WorkspaceSlugInput;
