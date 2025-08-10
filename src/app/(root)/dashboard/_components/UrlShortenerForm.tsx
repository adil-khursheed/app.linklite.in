"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { shortenLink } from "../_actions/shortenLink";
import ShortLinkDialog from "./ShortLinkDialog";
import { Loader2Icon } from "lucide-react";

const UrlShortenerFormSchema = z.object({
  originalUrl: z
    .url({
      message: "Please enter a valid URL",
    })
    .min(1, "This field is required."),
});

const UrlShortenerForm = () => {
  const [shortLinkData, setShortLinkData] = useState<TShortLink | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof UrlShortenerFormSchema>>({
    resolver: zodResolver(UrlShortenerFormSchema),
    defaultValues: {
      originalUrl: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof UrlShortenerFormSchema>) => {
    try {
      setShortLinkData(null);
      setLoading(true);
      const res = await shortenLink(data.originalUrl);
      setShortLinkData(res.url);
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create short link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3">
        <FormLabel id="originalUrl" className="">
          Enter your destination url
        </FormLabel>

        <div className="flex flex-col sm:flex-row gap-2">
          <FormField
            control={form.control}
            name="originalUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Enter your URL"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full sm:w-1/5 cursor-pointer">
            {loading ? (
              <Loader2Icon className="size-5 animate-spin" />
            ) : (
              "Create your Lite Link"
            )}
          </Button>
        </div>
      </form>

      {shortLinkData && <ShortLinkDialog data={shortLinkData} openOnMount />}
    </Form>
  );
};

export default UrlShortenerForm;
