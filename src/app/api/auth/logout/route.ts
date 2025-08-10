import axiosInstance from "@/axios/axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = await axiosInstance.post("/api/v1/users/logout");

    const { success, message } = res.data;

    (await cookies()).delete("_linklite_access");
    (await cookies()).delete("_linklite_refresh");
    (await cookies()).delete("_linklite_sidebar_state");
    return NextResponse.json({
      success,
      message,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Logout failed",
    });
  }
}
