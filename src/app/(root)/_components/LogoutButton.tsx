"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";
import { useAuthStore } from "@/store/auth";
import { _config } from "@/lib/_config";

const LogoutButton = () => {
  const [loading, setLoading] = React.useState(false);

  const { logout } = useAuthStore();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const { success } = await res.json();

      if (success) {
        googleLogout();
        logout();
        router.replace(`${_config.frontend_url_1}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant={"link"}
      className="cursor-pointer hover:no-underline has-[>svg]:px-0"
      onClick={handleLogout}
      disabled={loading}>
      <LogOutIcon />
      <span>Logout</span>
      {loading && <Loader2Icon className="ml-2 size-4 animate-spin" />}
    </Button>
  );
};

export default LogoutButton;
