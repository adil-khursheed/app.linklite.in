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

    const {
      access_token: accessToken,
      refresh_token,
      access_expiry,
      refresh_expiry,
      user,
      message,
      success,
    } = res.data;

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
      expires: new Date(access_expiry),
    });
    response.cookies.set("_linklite_refresh", refresh_token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(refresh_expiry),
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
