"use client";

import React, { useState } from "react";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { forgotPassword } from "../_actions/forgotPassword";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const ForgotPasswordSchema = z.object({
  email: z.email({ error: "Invalid email address" }).min(1),
});

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    try {
      setLoading(true);
      const res = await forgotPassword(data);
      toast.success(res.message);
      router.replace("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Reset link failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
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
          className="h-12 w-full cursor-pointer">
          {loading ? <Loader2Icon className="size-5 animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
