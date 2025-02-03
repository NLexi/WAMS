import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { hasPermission } from "./app/api/auth/[...nextauth]/route";

export const config = {
  runtime: "nodejs",
  matcher: [
    "/admin/:path*",
    "/editor/:path*",
    "/dashboard/:path*",
    "/blog/:path*",
  ],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.error("No token found in middleware");
    const url = req.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  const now = Date.now() / 1000;
  if (typeof token.expires_at === 'number' && token.expires_at < now) {
    if (token.refreshToken) {
      try {
        const refreshedToken = await refreshAuthToken(token.refreshToken as string);
        token.accessToken = refreshedToken.accessToken;
        token.expires_at = refreshedToken.expires_at;
      } catch (error) {
        console.error("Failed to refresh token:", error);
        const url = req.nextUrl.clone();
        url.pathname = "/auth/signin";
        return NextResponse.redirect(url);
      }
    } else {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

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
