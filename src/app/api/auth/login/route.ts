import axiosInstance from "@/axios/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if ([email, password].some((item) => item.trim() === "")) {
      return new NextResponse("Missing email or password", {
        status: 400,
      });
    }

    const res = await axiosInstance.post("/api/v1/users/login", {
      email,
      password,
    });

    const {
      access_token,
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

    response.cookies.set("_linklite_access", access_token, {
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
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
