import axiosInstance from "@/axios/axios";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = await axiosInstance.post("/api/v1/users/logout");

    const { success, message } = res.data;

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
