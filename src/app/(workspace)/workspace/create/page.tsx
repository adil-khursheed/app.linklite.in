import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/ui/logo";
import { Skeleton } from "@/components/ui/skeleton";
import Workspace_Form from "@/components/ui/workspace-form";
import React, { Suspense } from "react";

const Page = () => {
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

      <div className="relative z-10 w-full flex justify-start px-5 py-4">
        <Logo />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center w-full px-5">
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Create a new workspace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="w-full h-40" />}>
              <Workspace_Form />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
