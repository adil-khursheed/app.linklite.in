"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateLinkDialog } from "@/contexts/createLinkDialogContext";
import LinkForm from "./LinkForm";

const CreateLinksButton = () => {
  const { open, setOpen } = useCreateLinkDialog();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer h-10">
            Create Link{" "}
            <span className="text-[10px] leading-tight bg-secondary text-secondary-foreground px-1 py-0.5 rounded">
              C
            </span>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[80svh] sm:max-w-5xl">
          <DialogHeader className="mb-3">
            <DialogTitle>Create a short Link</DialogTitle>
            <DialogDescription className="sr-only">
              Create a short link to share with your friends.
            </DialogDescription>
          </DialogHeader>

          <LinkForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateLinksButton;
