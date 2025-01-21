import { NextResponse } from "next/server";
import { parseCookies } from "@/lib/cookies";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "@/lib/jwt";
import { UserRole } from "@/lib/userRoles";

export const config = {
  matcher: ["/authdemo/protected", "/authdemo/admin", "/authdemo/editor"],
};

export async function middleware(req: any) {
  const cookieHeader = req.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);

  const accessToken = cookies.accessToken;

  if (accessToken) {
    const user = await verifyAccessToken(accessToken);
    if (user) {
      if (
        req.nextUrl.pathname.startsWith("/authdemo/protected") ||
        (req.nextUrl.pathname.startsWith("/authdemo/admin") &&
          user.role === UserRole.ADMIN) ||
        (req.nextUrl.pathname.startsWith("/authdemo/editor") &&
          (user.role === UserRole.ADMIN || user.role === UserRole.EDITOR))
      ) {
        return NextResponse.next();
      }
      return NextResponse.redirect(
        new URL("/authdemo/unauthorized", req.nextUrl.origin)
      );
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

      if (
        req.nextUrl.pathname.startsWith("/authdemo/protected") ||
        (req.nextUrl.pathname.startsWith("/authdemo/admin") &&
          user.role === UserRole.ADMIN) ||
        (req.nextUrl.pathname.startsWith("/authdemo/editor") &&
          (user.role === UserRole.ADMIN || user.role === UserRole.EDITOR))
      ) {
        return response;
      }
      return NextResponse.redirect(
        new URL("/authdemo/unauthorized", req.nextUrl.origin)
      );
    }
  }

  return NextResponse.redirect(new URL("/authdemo/login", req.url));
}
