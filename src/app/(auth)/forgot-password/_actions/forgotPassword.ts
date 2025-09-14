"use server";

import kyInstance from "@/api-client/server-api-client";

export const forgotPassword = async (data: { email: string }) => {
  try {
    const res = await kyInstance.post("api/v1/users/forgot-password", {
      json: data,
    });
    return await res.json<{ success: boolean; message: string }>();
  } catch (error) {
    console.log(error);

    throw new Error(
      "An unknown error occurred while sending reset password link."
    );
  }
};
