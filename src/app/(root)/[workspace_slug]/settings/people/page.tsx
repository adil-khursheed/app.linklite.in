import React from "react";
import Container from "@/components/ui/container";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { InviteMemberDialogProvider } from "@/contexts/inviteMemberDialogContext";
import InviteMembersButton from "./_components/InviteMembersButton";

const Page = () => {
  return (
    <InviteMemberDialogProvider>
      <Container>
        <div className="flex h-full w-full flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="cursor-pointer md:hidden" />

              <h2 className="text-xl font-bold sm:text-2xl">Team Members</h2>
            </div>

            <InviteMembersButton />
          </div>
        </div>
      </Container>
    </InviteMemberDialogProvider>
  );
};

export default Page;
