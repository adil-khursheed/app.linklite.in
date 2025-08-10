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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { resetPassword } from "../_actions/resetPassword";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const ResetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  resetPasswordToken: z
    .string({ error: "Reset password token required" })
    .min(1),
});
const ResetPasswordForm = ({ token }: { token: string }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    form.setValue("resetPasswordToken", token);
  }, [token, form]);

  const handleSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    try {
      setLoading(true);
      const res = await resetPassword(data);
      toast.success(res.message);
      router.replace("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Reset password failed"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter new password"
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

export default ResetPasswordForm;
