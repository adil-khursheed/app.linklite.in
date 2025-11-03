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
import { useParams } from "next/navigation";
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

const DeleteWorkspaceSchema = z.object({
  slug: z.string().min(1, "This field is required"),
  confirm: z.string().min(1, "This field is required"),
});

const DeleteWorkspace = () => {
  const { workspace_slug } = useParams<{ workspace_slug: string }>();
  const confirm_text = "confirm delete workspace";

  const form = useForm<z.infer<typeof DeleteWorkspaceSchema>>({
    resolver: zodResolver(DeleteWorkspaceSchema),
    defaultValues: {
      slug: "",
      confirm: "",
    },
  });

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
                <form className="space-y-5">
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

                  <Button variant={"destructive"} className="w-full">
                    Confirm Delete Workspace
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
