import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "bg-background border-border h-full w-full overflow-y-auto rounded-2xl border px-3 py-5 shadow sm:p-5",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Container;
