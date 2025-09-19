import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, FingerprintIcon } from "lucide-react";
import React from "react";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

const Page = () => {
  return (
    <section className="p-5 h-screen w-screen flex flex-col">
      <div className="flex items-center justify-between">
        <Logo />

        <Link href="/signup">
          <Button className="cursor-pointer">Sign Up</Button>
        </Link>
      </div>

      <div className="flex items-center justify-center flex-1">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center gap-2">
            <div className="size-12 p-2 rounded-full bg-p-primary-light flex items-center justify-center">
              <FingerprintIcon className="text-primary" size={25} />
            </div>

            <h2 className="text-xl font-bold">Forgot Password</h2>

            <p className="text-neutral-500 text-center">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
          </CardHeader>

          <CardContent>
            <ForgotPasswordForm />

            <div className="mt-6 flex items-center justify-center">
              <Link href="/login">
                <Button variant={"link"} className="cursor-pointer">
                  <ArrowLeft />
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Page;
