import React from "react";
import Container from "@/components/ui/container";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { InviteMemberDialogProvider } from "@/contexts/inviteMemberDialogContext";
import InviteMembersButton from "./_components/InviteMembersButton";

const Page = () => {
  return (
    <InviteMemberDialogProvider>
      <Container>
        <div className="max-w-6xl w-full h-full mx-auto flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="cursor-pointer md:hidden" />

              <h2 className="text-xl sm:text-2xl font-bold">Team Members</h2>
            </div>

            <InviteMembersButton />
          </div>
        </div>
      </Container>
    </InviteMemberDialogProvider>
  );
};

export default Page;
