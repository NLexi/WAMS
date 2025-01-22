import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

const mockUserDatabase: { [email: string]: User } = {
  "admin@example.com": {
    id: "1",
    email: "admin@example.com",
    password: bcrypt.hashSync("password123", 10),
    role: 'ADMIN',
  },
  "user@example.com": {
    id: "2",
    email: "user@example.com",
    password: bcrypt.hashSync("password456", 10),
    role: 'USER',
  },
  "editor@example.com": {
    id: "3",
    email: "editor@example.com",
    password: bcrypt.hashSync("password789", 10),
    role: 'EDITOR',
  },
};

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = mockUserDatabase[email];
  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const accessToken = await generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = await generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({ accessToken, role: user.role });
  response.headers.set(
    "Set-Cookie",
    `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=900; Secure; SameSite=Strict`
  );
  response.headers.append(
    "Set-Cookie",
    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=86400; Secure; SameSite=Strict`
  );

  return response;
}
