"use server";

import axiosInstance from "@/axios/axios";
import { AxiosError, AxiosResponse } from "axios";

export const shortenLink = async (url: string) => {
  try {
    const res: AxiosResponse<{
      success: boolean;
      message: string;
      url: TShortLink;
    }> = await axiosInstance.post("/api/v1/urls/create", {
      originalLink: decodeURIComponent(url),
    });

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`${error.message}`);
    } else {
      throw new Error("An unknown error occurred while shortening the link");
    }
  }
};
