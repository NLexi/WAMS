import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token is missing" },
      { status: 401 }
    );
  }

  const user = await verifyAccessToken(accessToken);

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 }
    );
  }

  return NextResponse.json(
    { message: "Welcome to the protected route", role: user.role },
    { status: 200 }
  );
}
