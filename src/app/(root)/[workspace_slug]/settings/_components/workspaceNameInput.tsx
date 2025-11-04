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
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import WorkspaceSettingsCard from "./workspaceSettingsCard";
import { updateWorkspace } from "../_actions/updateWorkspace";
import { Loader2Icon } from "lucide-react";

const WorkspaceNameSchema = z.object({
  name: z
    .string()
    .min(1, "Workspace name is required")
    .max(32, "Workspace name must be 32 characters or less"),
});

const WorkspaceNameInput = () => {
  const [isPending, setIsPending] = useState(false);

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

  const queryClient = useQueryClient();

  const onSubmit = async (data: z.infer<typeof WorkspaceNameSchema>) => {
    try {
      setIsPending(true);

      const res = await updateWorkspace(data, workspace_slug);
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ["workspace", workspace_slug],
        });
        queryClient.invalidateQueries({
          queryKey: ["workspaces"],
        });
        toast.success("Workspace name updated successfully.");
        form.reset({ name: res.workspace.name });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update workspace name.");
    } finally {
      setIsPending(false);
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

          <div className="w-full flex items-center justify-between gap-3 py-4 px-6 bg-primary/5">
            <span className="text-muted-foreground text-sm">
              Max 32 characters.
            </span>

            <Button
              type="submit"
              disabled={isDisabled || !nameWatched || isPending}
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

export default WorkspaceNameInput;
