import React from "react";
import Link from "next/link";
import { ArrowLeft, LockIcon } from "lucide-react";
import { colors } from "@/lib/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import ResetPasswordForm from "./_components/ResetPasswordForm";

const Page = async ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = await params;

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
              <LockIcon color={colors["s-secondary"]} size={25} />
            </div>

            <h2 className="text-xl font-bold">Reset Password</h2>
          </CardHeader>

          <CardContent>
            <ResetPasswordForm token={token} />

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
