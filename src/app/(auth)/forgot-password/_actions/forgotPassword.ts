"use server";

import axiosInstance from "@/axios/axios";
import { AxiosError } from "axios";

export const forgotPassword = async (data: { email: string }) => {
  try {
    const res = await axiosInstance.post("/api/v1/users/forgot-password", data);
    return res.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error(
        "An unknown error occurred while sending reset password link."
      );
    }
  }
};
