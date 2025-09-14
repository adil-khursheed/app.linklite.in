"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateLinkDialog } from "@/contexts/createLinkDialogContext";

const CreateLinksButton = () => {
  const { open, setOpen } = useCreateLinkDialog();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer h-11">
            Create Link{" "}
            <span className="text-[10px] leading-tight bg-secondary text-secondary-foreground px-1 py-0.5 rounded">
              C
            </span>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a short Link</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateLinksButton;
