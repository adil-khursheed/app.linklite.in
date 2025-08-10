"use server";

import axiosInstance from "@/axios/axios";
import { AxiosError } from "axios";

export const resetPassword = async (data: {
  password: string;
  resetPasswordToken: string;
}) => {
  try {
    const res = await axiosInstance.post("/api/v1/users/reset-password", data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data.message}`);
    } else {
      throw new Error("An unknown error occurred while resetting the password");
    }
  }
};
