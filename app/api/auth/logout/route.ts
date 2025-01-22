import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.headers.set(
    "Set-Cookie",
    `accessToken=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict`
  );
  response.headers.append(
    "Set-Cookie",
    `refreshToken=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict`
  );

  return response;
}
