import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const WorkspaceSettingsCard = ({
  children,
  description = "",
  title = "",
  className = "",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}) => {
  return (
    <Card className={cn("pb-0 overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-0">{children}</CardContent>
    </Card>
  );
};

export default WorkspaceSettingsCard;
