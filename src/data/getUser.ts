import "server-only";

import { cache } from "react";
import kyInstance from "@/api-client/server-api-client";
import { redirect } from "next/navigation";

export const getUser = cache(async () => {
  try {
    const user = await kyInstance.get(`api/v1/users/profile`, {
      cache: "force-cache",
      next: {
        tags: ["current_user"],
        revalidate: 60 * 10,
      },
    });
    const userData = await user.json<UserInfo>();
    if (!userData) {
      redirect("/login");
    }

    return userData;
  } catch (error) {
    console.log(error);
    redirect("/login");
  }
});
