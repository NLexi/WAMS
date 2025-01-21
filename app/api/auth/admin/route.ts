import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";
import { UserRole } from "@/lib/userRoles";
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

  if (user && user.role === UserRole.ADMIN) {
    return NextResponse.json(
      { message: "Welcome to the admin route" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "Invalid or expired token" },
    { status: 403 }
  );
}
