import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { hasPermission } from "./app/api/auth/[...nextauth]/route";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  const now = Date.now() / 1000;
  if (token.expires_at && token.expires_at < now) {
    if (token.refreshToken) {
      const refreshedToken = await refreshAuthToken(token.refreshToken);
      token.accessToken = refreshedToken.accessToken;
      token.expires_at = refreshedToken.expires_at;
    }
  }

  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  if (
    pathname.startsWith("/editor") &&
    !["ADMIN", "EDITOR"].includes(token.role)
  ) {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/editor/:path*", "/dashboard/:path*", "/blog/:path*"],
};

async function refreshAuthToken(refreshToken: string) {
  const response = await fetch("YOUR_REFRESH_TOKEN_URL", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  return {
    accessToken: data.accessToken,
    expires_at: data.expires_at,
  };
}
