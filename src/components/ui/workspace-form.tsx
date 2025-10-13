"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { create_workspace } from "@/_actions/create_workspace";
import { toast } from "sonner";

const Workspace_Form_Schema = z.object({
  name: z.string().min(1, { message: "Workspace name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
});

const Workspace_Form = ({
  setDialogOpen,
}: {
  setDialogOpen?: (open: boolean) => void;
}) => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof Workspace_Form_Schema>>({
    resolver: zodResolver(Workspace_Form_Schema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const { watch, setValue } = form;

  const slugTransform = useCallback((value?: string) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "name") {
        setValue("slug", slugTransform(value?.name), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const handleFormSubmit = async (
    data: z.infer<typeof Workspace_Form_Schema>
  ) => {
    try {
      setIsPending(true);

      const res = await create_workspace(data);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      if (setDialogOpen) setDialogOpen(false);
      router.replace(`/${res.workspace.slug}/links`);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create workspace"
      );
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleFormSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter workspace name"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <div className="text-xs sm:text-sm text-muted-foreground/80 border border-input h-12 flex items-center justify-center px-2 sm:px-3.5 rounded-s-md shadow-xs bg-input">
                    app.linklite.click
                  </div>
                  <Input
                    placeholder="Enter workspace slug"
                    className="h-12 rounded-s-none"
                    onInput={(e) => {
                      setValue("slug", slugTransform(e.currentTarget.value), {
                        shouldValidate: true,
                      });
                    }}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription className="text-xs">
                You can change this later in your workspace settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer h-12"
          disabled={isPending}>
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Create Workspace"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Workspace_Form;
