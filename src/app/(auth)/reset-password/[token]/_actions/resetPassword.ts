"use server";

import kyInstance from "@/api-client/server-api-client";
import { AxiosError } from "axios";

export const resetPassword = async (data: {
  password: string;
  resetPasswordToken: string;
}) => {
  try {
    const res = await kyInstance.post("api/v1/users/reset-password", {
      json: data,
    });
    return await res.json<{ success: boolean; message: string }>();
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data.message}`);
    } else {
      throw new Error("An unknown error occurred while resetting the password");
    }
  }
};
