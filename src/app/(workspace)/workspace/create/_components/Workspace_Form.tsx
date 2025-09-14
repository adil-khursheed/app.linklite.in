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
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Workspace_Form_Schema = z.object({
  name: z.string().min(1, { message: "Workspace name is required" }),
  slug: z.string().min(1, { message: "Workspace slug is required" }),
});

const Workspace_Form = () => {
  const form = useForm<z.infer<typeof Workspace_Form_Schema>>({
    resolver: zodResolver(Workspace_Form_Schema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const handleFormSubmit = async (
    data: z.infer<typeof Workspace_Form_Schema>
  ) => {
    console.log(data);
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

        <Button type="submit" className="w-full cursor-pointer h-12">
          Create Workspace
        </Button>
      </form>
    </Form>
  );
};

export default Workspace_Form;
