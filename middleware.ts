import { NextResponse } from "next/server";
import { parseCookies } from "@/lib/cookies";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "@/lib/jwt";

export const config = {
  matcher: ["/protected/:path*", "/login"],
};

export async function middleware(req: any) {
  const cookieHeader = req.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);

  const accessToken = cookies.accessToken;

  if (accessToken) {
    const user = await verifyAccessToken(accessToken);
    if (user) {
      if (req.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/protected", req.url));
      }
      return NextResponse.next();
    }
  }

  const refreshToken = cookies.refreshToken;

  if (refreshToken) {
    const user = await verifyRefreshToken(refreshToken);

    if (user) {
      const newAccessToken = await generateAccessToken({
        id: user.id as string,
        email: user.email as string,
        role: user.role as string,
      });

      const response = NextResponse.next();
      response.headers.set(
        "Set-Cookie",
        `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=900; Secure; SameSite=Strict`
      );

      if (req.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/protected", req.url));
      }
      return response;
    }
  }

  if (req.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", req.url));
}
