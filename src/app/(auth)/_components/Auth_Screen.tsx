import React, { Suspense } from "react";
import Link from "next/link";

import Auth_Form from "../_components/Auth_Form";
import Logo from "@/components/ui/logo";
import { Loader2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Auth_Screen = ({ isSignUp = false }: { isSignUp?: boolean }) => {
  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center">
      {/* Amber Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, transparent 40%, rgba(235, 94, 40,0.05) 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      {/* Diagonal Fade Grid Background - Top Right */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(209, 213, 219, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(209, 213, 219, 0.1) 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      />

      <div className="relative z-10 w-full flex justify-start px-5 py-4">
        <Logo />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center w-full px-5">
        <Card className="w-full sm:max-w-md">
          <CardContent>
            <div className="flex flex-col gap-2 mb-5">
              <h2 className="text-3xl font-bold">
                {isSignUp ? "Create your account" : "Welcome back"}
              </h2>
              {!isSignUp && (
                <p className="text-lg">
                  Enter your credentials to login to your account.
                </p>
              )}
              <p className="text-sm text-neutral-500">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <Link
                  href={isSignUp ? "/login" : "/signup"}
                  className="text-primary underline">
                  {isSignUp ? "Login" : "Sign Up"}
                </Link>
              </p>
            </div>

            <Suspense fallback={<Loader2Icon className="animate-spin" />}>
              <Auth_Form isSignUp={isSignUp} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth_Screen;
