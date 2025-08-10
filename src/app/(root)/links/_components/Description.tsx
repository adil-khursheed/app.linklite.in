"use client";

import { CardDescription } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
import React from "react";

const Description = () => {
  const { user } = useAuthStore();
  return (
    <CardDescription>
      You can create{" "}
      <span className="font-medium">{user?.short_links_limit}</span> more short
      links this month.
    </CardDescription>
  );
};

export default Description;
