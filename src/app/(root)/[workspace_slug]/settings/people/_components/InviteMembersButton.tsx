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
import { useInviteMemberDialog } from "@/contexts/inviteMemberDialogContext";

const InviteMembersButton = () => {
  const { open, setOpen } = useInviteMemberDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer h-10">
          Invite Members{" "}
          <span className="text-[10px] leading-tight bg-secondary text-secondary-foreground px-1 py-0.5 rounded">
            M
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Invite Team Members</DialogTitle>
          <DialogDescription>
            Invite team members with different roles and permissions.
            <br />
            Invitations will be valid for 14 days.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembersButton;
