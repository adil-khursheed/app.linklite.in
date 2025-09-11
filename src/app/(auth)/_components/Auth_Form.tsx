"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

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
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import GoogleSignIn from "./GoogleSignIn";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";

const LoginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login_Form = ({ isSignUp = false }: { isSignUp?: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAuthStore();

  const searchParams = useSearchParams();
  const url = searchParams.get("url");

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      setLoading(true);

      let res: Response;

      if (isSignUp) {
        res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      const { success, user } = await res.json();

      if (success) {
        setUser(user);

        if (url) {
          router.replace(`/links?url=${encodeURIComponent(url)}`);
        } else {
          router.replace("/links");
        }

        toast.success(`${isSignUp ? "Signup" : "Login"} successful`);
      }
    } catch (error) {
      console.log(error);

      toast.error(`${isSignUp ? "Signup" : "Login"} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <GoogleSignIn url={url} />

      <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
        <span className="text-muted-foreground text-xs">OR</span>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col space-y-3 w-full"
          onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 h-12 border border-input rounded-md shadow-xs">
                    <Input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      className="h-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-full cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isSignUp && (
            <div className="flex justify-end">
              <Link href="/forgot-password">
                <Button
                  variant="link"
                  className="underline px-0 cursor-pointer">
                  Forgot Password?
                </Button>
              </Link>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className={cn(
              "cursor-pointer w-full h-12",
              isSignUp && "mt-4",
              loading && "cursor-not-allowed opacity-50"
            )}>
            {loading ? (
              <Loader2 color="white" size={16} className="animate-spin" />
            ) : isSignUp ? (
              "Create free account"
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login_Form;
