import kyInstance from "@/api-client/server-api-client";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = await kyInstance.post("api/v1/users/logout");
    const { success, message } = await res.json<{
      success: boolean;
      message: string;
    }>();

    const response = NextResponse.json({
      success,
      message,
    });

    response.cookies.delete("_linklite_access");
    response.cookies.delete("_linklite_refresh");
    response.cookies.delete("_linklite_sidebar_state");
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Logout failed",
    });
  }
}
