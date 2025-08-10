import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import Auth_Form from "../_components/Auth_Form";
import Logo from "@/components/ui/logo";
import { Loader2 } from "lucide-react";

const Page = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="flex-1/5 flex flex-col px-5">
        <Logo className="pt-5" />

        <div className="flex-1 flex flex-col justify-center space-y-4 max-w-md w-full h-full mx-auto">
          <div className="flex flex-col gap-2 mb-5">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="text-lg">
              Enter your credentials to login to your account.
            </p>
            <p className="text-sm text-neutral-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-s-secondary underline">
                Sign Up
              </Link>
            </p>
          </div>

          <Suspense fallback={<Loader2 className="animate-spin" />}>
            <Auth_Form />
          </Suspense>
        </div>
      </div>

      <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-p-primary-light rounded-s-4xl px-4">
        <Image
          src={"/sign_in.png"}
          alt="Login to LinkLite.in"
          width={400}
          height={400}
        />

        <p className="text-center text-lg font-semibold">
          Connect LinkLite to your daily online presence.
        </p>
      </div>
    </div>
  );
};

export default Page;
