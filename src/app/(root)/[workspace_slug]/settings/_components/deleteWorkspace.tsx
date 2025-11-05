"use client";

import React from "react";
import WorkspaceSettingsCard from "./workspaceSettingsCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { deleteWorkspace } from "../_actions/deleteWorkspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

const DeleteWorkspaceSchema = z.object({
  slug: z.string().min(1, "This field is required"),
  confirm: z.string().min(1, "This field is required"),
});

const DeleteWorkspace = () => {
  const router = useRouter();
  const { workspace_slug } = useParams<{ workspace_slug: string }>();

  const confirm_text = "confirm delete workspace";

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof DeleteWorkspaceSchema>>({
    resolver: zodResolver(DeleteWorkspaceSchema),
    defaultValues: {
      slug: "",
      confirm: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteWorkspace(workspace_slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Workspace deleted successfully");
      router.replace("/");
    },
  });

  const onSubmit = async (data: z.infer<typeof DeleteWorkspaceSchema>) => {
    try {
      if (data.slug !== workspace_slug) {
        form.setError("slug", {
          message: "Workspace slug does not match",
        });
        return;
      }

      if (data.confirm !== confirm_text) {
        form.setError("confirm", {
          message: "Confirmation text does not match",
        });
        return;
      }

      await mutateAsync();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Workspace deletion failed"
      );
    }
  };

  return (
    <WorkspaceSettingsCard
      title="Delete Workspace"
      description="Permanently delete your workspace, custom domain, and all associated links + their stats. This action cannot be undone - please proceed with caution"
      className="border-destructive">
      <div className="border-t border-destructive py-4 px-6 flex items-center justify-end-safe">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"destructive"}>Delete Workspace</Button>
          </DialogTrigger>

          <DialogContent className="px-0 pb-0 overflow-hidden">
            <DialogHeader className="px-6">
              <DialogTitle>Delete Workspace</DialogTitle>
              <DialogDescription>
                Warning: This will permanently delete your workspace, custom
                domain, and all associated links and their respective analytics.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-muted/20 p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Enter the workspace slug
                          <b>{workspace_slug}</b> to continue:
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          To verify, type
                          <b>{confirm_text}</b> below:
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    variant={"destructive"}
                    disabled={isPending}
                    className="w-full">
                    {isPending ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Confirm Delete Workspace"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </WorkspaceSettingsCard>
  );
};

export default DeleteWorkspace;
