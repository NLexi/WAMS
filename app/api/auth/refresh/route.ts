import { NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const refreshToken = (await cookieStore).get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token is missing" },
      { status: 401 }
    );
  }

  try {
    const user = await verifyRefreshToken(refreshToken);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 403 }
      );
    }

    const accessToken = await generateAccessToken({
      id: user.id as string,
      email: user.email as string,
      role: user.role as string,
    });

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
