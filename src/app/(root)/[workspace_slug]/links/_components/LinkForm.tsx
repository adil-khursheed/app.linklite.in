"use client";

import React, { useEffect, useState } from "react";
import z from "zod";
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
import ReactQrCode from "react-qr-code";
import { nanoid } from "nanoid";
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "@/components/ui/kibo-ui/tags";
import { CheckIcon, PlusIcon, ImageIcon, Loader2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getUrlMetadata } from "../_actions/getUrlMetadata";
import { _config } from "@/lib/_config";
import { isValidUrl } from "@/lib/utils";

const CreateLinkSchema = z.object({
  destination_url: z.url().min(2, { error: "Destination url is required" }),
  short_link: z.string().min(2, { error: "Short link is required" }).max(8),
  tags: z.array(z.string()),
  comments: z.string().optional(),
  qr_code: z.string().optional(),
  metadata: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    favicon: z.string().optional(),
  }),
});

// Example tags list
const availableTags = [
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "ts", label: "TypeScript" },
];

const LinkForm = () => {
  const [newTag, setNewTag] = useState("");
  const [metadataLoading, setMetadataLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateLinkSchema>>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues: {
      destination_url: "",
      short_link: "",
      tags: [],
    },
  });

  const destination_url_value = form.watch("destination_url");
  const preview_image = form.watch("metadata.image");
  const preview_title = form.watch("metadata.title");
  const preview_description = form.watch("metadata.description");

  useEffect(() => {
    const short_link = nanoid(8);
    form.setValue("short_link", short_link);
  }, [form]);

  useEffect(() => {
    const fetch_url_metadata = async (url: string) => {
      try {
        setMetadataLoading(true);
        const metadata = await getUrlMetadata(url);
        if (metadata.success) {
          form.setValue("metadata.title", metadata.metadata.title);
          form.setValue("metadata.description", metadata.metadata.description);
          form.setValue("metadata.image", metadata.metadata.image);
          form.setValue("metadata.favicon", metadata.metadata.favicon);
        }
      } catch (error) {
        console.error("Error fetching URL metadata:", error);
      } finally {
        setMetadataLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (destination_url_value && isValidUrl(destination_url_value)) {
        fetch_url_metadata(destination_url_value);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [destination_url_value, form]);

  const handleLinkSubmit = async (data: z.infer<typeof CreateLinkSchema>) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLinkSubmit)}
          className="flex flex-col">
          <div className="flex-1 flex flex-col md:flex-row gap-4">
            <div className="flex-2 space-y-8">
              <FormField
                control={form.control}
                name="destination_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="short_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Link</FormLabel>
                    <FormControl>
                      <div className="flex items-center ">
                        <div className="h-10 rounded-s-md bg-muted/30 w-3xs border border-input shadow flex items-center px-3">
                          <span className="text-sm text-muted-foreground">
                            linklite.in
                          </span>
                        </div>
                        <Input
                          placeholder="(optional)"
                          {...field}
                          className="rounded-s-none h-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Tags className="w-full">
                        <TagsTrigger>
                          {field.value.map((tag) => (
                            <TagsValue
                              key={tag}
                              onRemove={() =>
                                field.onChange(
                                  field.value.filter((t) => t !== tag)
                                )
                              }>
                              {availableTags.find((t) => t.id === tag)?.label ??
                                tag}
                            </TagsValue>
                          ))}
                        </TagsTrigger>
                        <TagsContent>
                          <TagsInput
                            onValueChange={setNewTag}
                            placeholder="Search tag..."
                          />
                          <TagsList>
                            <TagsEmpty>
                              <Button
                                variant={"link"}
                                className="mx-auto flex cursor-pointer items-center gap-2"
                                onClick={() => {
                                  if (!newTag) return;
                                  const newTagObj = {
                                    id: newTag,
                                    label: newTag,
                                  };
                                  availableTags.push(newTagObj); // optional: persist somewhere
                                  field.onChange([...field.value, newTag]);
                                  setNewTag("");
                                }}
                                type="button">
                                <PlusIcon
                                  className="text-muted-foreground"
                                  size={14}
                                />
                                Create new tag: {newTag}
                              </Button>
                            </TagsEmpty>
                            <TagsGroup>
                              {availableTags.map((tag) => (
                                <TagsItem
                                  key={tag.id}
                                  onSelect={() => {
                                    if (field.value.includes(tag.id)) return;
                                    field.onChange([...field.value, tag.id]);
                                  }}
                                  value={tag.id}>
                                  {tag.label}
                                  {field.value.includes(tag.id) && (
                                    <CheckIcon
                                      className="text-muted-foreground"
                                      size={14}
                                    />
                                  )}
                                </TagsItem>
                              ))}
                            </TagsGroup>
                          </TagsList>
                        </TagsContent>
                      </Tags>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add comments"
                        {...field}
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1 border border-border rounded-lg p-3">
              <div className="flex flex-col items-center justify-center gap-4">
                <FormField
                  control={form.control}
                  name="qr_code"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>QR Code</FormLabel>
                      <FormControl className="w-full rounded-md border border-border py-2 flex items-center justify-center bg-accent/20">
                        <ReactQrCode
                          value={
                            field.value
                              ? `${_config.backend_url}/${field.value}`
                              : ""
                          }
                          size={64}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metadata"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Link Preview</FormLabel>
                      <FormControl>
                        <div>
                          <div className="w-full rounded-md border border-border py-2 flex items-center justify-center bg-accent/20 aspect-[200/120]">
                            {metadataLoading ? (
                              <Loader2Icon className="animate-spin" size={16} />
                            ) : preview_image ? (
                              <img
                                src={preview_image}
                                alt={field.value?.title || ""}
                                className="object-contain w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                                <ImageIcon />
                                <p className="text-xs text-muted-foreground max-w-60 text-center">
                                  Enter a link to generate a preview
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="space-y-1 mt-1">
                            <p className="text-xs text-muted-foreground min-w-0 w-full truncate">
                              {preview_title || "Add a title"}
                            </p>
                            <p className="text-xs text-muted-foreground min-w-0 w-full truncate">
                              {preview_description || "Add a description"}
                            </p>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <Button type="submit">Create Link</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LinkForm;
