import axiosInstance from "@/axios/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { access_token } = await req.json();
    if (!access_token) {
      return NextResponse.json({
        success: false,
        message: "Access token is required",
      });
    }

    const res = await axiosInstance.post("/api/v1/users/google-auth", {
      access_token,
    });

    const { accessToken, refreshToken, user, message, success } = res.data;

    const response = NextResponse.json(
      {
        success,
        message,
        user,
      },
      {
        status: res.status,
      }
    );

    response.cookies.set("_linklite_access", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60),
    });
    response.cookies.set("_linklite_refresh", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Google authentication failed",
    });
  }
}
