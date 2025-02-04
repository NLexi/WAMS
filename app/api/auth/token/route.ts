import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const refreshToken = await generateRefreshToken(session.user);

  const response = new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
  });
  response.headers.append(
    "Set-Cookie",
    `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; Max-Age=604800`
  );

  return response;
}

async function generateRefreshToken(user: { id: string; role: string; departmentId?: string }) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const refreshToken = await new SignJWT({
    id: user.id,
    role: user.role,
    departmentId: user.departmentId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return refreshToken;
}
