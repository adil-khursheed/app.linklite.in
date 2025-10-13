"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Workspace_Form from "@/components/ui/workspace-form";

const WorkspaceDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="px-0">
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="hover:bg-transparent cursor-pointer">
            <PlusIcon />
            <span>Create Workspace</span>
          </Button>
        </DialogTrigger>
      </DropdownMenuItem>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a workspace</DialogTitle>
          <DialogDescription>
            Set up a common space to manage your links with your team
          </DialogDescription>
        </DialogHeader>

        <Workspace_Form setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceDialog;
