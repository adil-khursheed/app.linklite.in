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
        "px-3 py-5 sm:p-5 bg-background rounded-md h-[calc(100vh-16px)] shadow border border-border overflow-y-auto",
        className
      )}>
      {children}
    </section>
  );
};

export default Container;
