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
import { Label } from "@/components/ui/label";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getTags } from "../../_actions/getTags";
import { createTag } from "../../_actions/createTags";
import { toast } from "sonner";

const CreateLinkSchema = z.object({
  destination_url: z.url().min(2, { error: "Destination url is required" }),
  short_link: z.string().min(2, { error: "Short link is required" }).max(8),
  tags: z.array(z.string()),
  comment: z.string().optional(),
  qr_code: z.string().optional(),
  metadata: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    favicon: z.string().optional(),
  }),
});

const LinkForm = () => {
  const [newTag, setNewTag] = useState("");
  const [metadataLoading, setMetadataLoading] = useState(false);

  const params = useParams<{ workspace_slug: string }>();
  const { workspace_slug } = params;

  const queryClient = useQueryClient();

  const { data: tagsData } = useSuspenseQuery({
    queryKey: ["tags", workspace_slug],
    queryFn: () => getTags(workspace_slug),
  });

  const form = useForm<z.infer<typeof CreateLinkSchema>>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues: {
      destination_url: "",
      short_link: nanoid(8),
      tags: [],
      comment: "",
    },
  });

  const { mutate: createTagMutate, isPending } = useMutation({
    mutationFn: () =>
      createTag({
        name: newTag,
        workspace_slug,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tags", workspace_slug] });
      form.setValue("tags", [...form.getValues("tags"), data.tag._id]);
      setNewTag("");
      toast.success(`Tag ${data.tag.name} created successfully`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const destination_url_value = form.watch("destination_url");
  const short_link_value = form.watch("short_link");
  const preview_image = form.watch("metadata.image");
  const preview_title = form.watch("metadata.title");
  const preview_description = form.watch("metadata.description");

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
        <form onSubmit={form.handleSubmit(handleLinkSubmit)}>
          <div className="grid w-full gap-y-6 max-md:overflow-auto md:grid-cols-[2fr_1fr] max-md:max-h-[calc(100dvh-200px)] max-md:min-h-[min(566px,_calc(100dvh-200px))] md:[&>div]:max-h-[calc(100dvh-200px)] md:[&>div]:min-h-[min(566px,_calc(100dvh-200px))]">
            <div className="flex-1 pr-6 md:overflow-y-auto [scrollbar-width:none]">
              <div className="space-y-6">
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
                          className="h-12 border-border shadow-none"
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
                        <div className="flex items-center">
                          <div className="h-12 rounded-s-md bg-muted/30 w-3xs border border-border border-r-0 flex items-center px-3">
                            <span className="text-sm text-muted-foreground">
                              linklite.in
                            </span>
                          </div>
                          <Input
                            placeholder="(optional)"
                            {...field}
                            className="rounded-s-none h-12 border-border shadow-none"
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
                          <TagsTrigger className="dark:bg-border/30 border-border min-h-12 flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-none hover:bg-transparent cursor-pointer">
                            {field.value.map((tag) => (
                              <TagsValue
                                key={tag}
                                onRemove={() =>
                                  field.onChange(
                                    field.value.filter((t) => t !== tag)
                                  )
                                }
                                className="max-w-[200px]">
                                <span className="truncate">
                                  {tagsData.tags.find((t) => t._id === tag)
                                    ?.name ?? tag}
                                </span>
                              </TagsValue>
                            ))}
                          </TagsTrigger>
                          <TagsContent className="pointer-events-auto">
                            <TagsInput
                              onValueChange={setNewTag}
                              placeholder="Search tag..."
                            />
                            <TagsList>
                              <TagsEmpty className="h-full">
                                <Button
                                  variant={"secondary"}
                                  className="w-full h-auto mx-auto flex cursor-pointer items-start justify-start gap-2"
                                  onClick={() => createTagMutate()}
                                  type="button">
                                  {isPending ? (
                                    <Loader2Icon
                                      className="animate-spin"
                                      size={14}
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="text-muted-foreground"
                                      size={14}
                                    />
                                  )}
                                  Create: {newTag}
                                </Button>
                              </TagsEmpty>
                              <TagsGroup>
                                {tagsData.tags.map((tag) => (
                                  <TagsItem
                                    key={tag._id}
                                    onSelect={() => {
                                      if (field.value.includes(tag._id)) return;
                                      field.onChange([...field.value, tag._id]);
                                    }}
                                    value={tag._id}>
                                    {tag.name}
                                    {field.value.includes(tag._id) && (
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
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comments</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add comment"
                          {...field}
                          className="h-40 resize-none border-border shadow-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex-1 max-w-sm w-full border border-border rounded-lg px-3 py-6 md:overflow-y-auto [scrollbar-width:none]">
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <div className="w-full space-y-2">
                  <Label>QR Code</Label>

                  <div className="w-full rounded-md border border-border py-2 flex items-center justify-center bg-accent/20">
                    <ReactQrCode
                      value={
                        short_link_value
                          ? `${_config.backend_url}/${short_link_value}`
                          : ""
                      }
                      size={64}
                    />
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <Label>Link Preview</Label>

                  <div>
                    <div className="w-full rounded-md border border-border py-2 flex items-center justify-center bg-accent/20 aspect-[220/120]">
                      {metadataLoading ? (
                        <Loader2Icon className="animate-spin" size={16} />
                      ) : preview_image ? (
                        <img
                          src={preview_image}
                          alt={"Preview Image"}
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

                    <div className="space-y-1 mt-1 flex flex-col items-start">
                      <p className="text-xs text-muted-foreground min-w-0 w-full truncate">
                        {preview_title || "Add a title"}
                      </p>
                      <p className="text-xs text-muted-foreground min-w-0 w-full truncate">
                        {preview_description || "Add a description"}
                      </p>
                    </div>
                  </div>
                </div>
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
