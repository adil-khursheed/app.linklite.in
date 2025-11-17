"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

import { getWorkspaceMembers } from "../_actions/getWorkspaceMembers";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useAuthStore } from "@/store/auth";
import MemberActionButton from "./MemberActionButton";

const UpdateUserRoleSchema = z.object({
  role: z.enum(["ws:owner", "ws:admin", "ws:member"], {
    error: "Please select a valid role",
  }),
});

const MembersList = () => {
  const { workspace_slug } = useParams<{ workspace_slug: string }>();

  const { user } = useAuthStore();

  const { data } = useSuspenseQuery({
    queryKey: ["team-members", workspace_slug],
    queryFn: () => getWorkspaceMembers(workspace_slug),
  });

  const form = useForm<z.infer<typeof UpdateUserRoleSchema>>({
    resolver: zodResolver(UpdateUserRoleSchema),
  });

  return (
    <div className="border-border flex-1 rounded-sm border">
      <ul>
        {data && data.members && data.members.length > 0 ? (
          data.members.map((member) => (
            <li
              key={member._id}
              className="flex items-center justify-between px-3 py-4"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar className="sm:size-10">
                  <AvatarImage src={member.user.avatar.url || undefined} />
                  <AvatarFallback className="capitalize">
                    {member.user.display_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex min-w-0 flex-1 flex-col items-start gap-px">
                  <div className="w-full text-sm font-medium capitalize">
                    {member.user.display_name}
                  </div>
                  <div className="text-muted-foreground w-full pr-2 text-[10px] sm:text-xs">
                    <span className="w-full truncate">{member.user.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Form {...form}>
                  <form>
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={member.role}
                            disabled={
                              member.user._id === user?._id ||
                              !member.permissions.includes(
                                "ws:members:update_role",
                              )
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                              <SelectItem value="ws:owner">Owner</SelectItem>
                              <SelectItem value="ws:admin">Admin</SelectItem>
                              <SelectItem value="ws:member">Member</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>

                <MemberActionButton />
              </div>
            </li>
          ))
        ) : (
          <li></li>
        )}
      </ul>
    </div>
  );
};

export default MembersList;
