"use server";

import kyInstance from "@/api-client/server-api-client";

export const shortenLink = async (url: string) => {
  try {
    const res = await kyInstance.post("api/v1/urls/create", {
      json: { originalLink: decodeURIComponent(url) },
    });

    return await res.json<{
      message: string;
      success: boolean;
      url: TShortLink;
    }>();
  } catch (error) {
    console.error(error);
    throw new Error("Url shortening failed");
  }
};
