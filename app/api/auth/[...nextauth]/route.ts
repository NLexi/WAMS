import NextAuth, { AuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/data/users";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { jwtVerify, SignJWT } from "jose";
import { NextResponse } from "next/server";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = users.find((u) => u.email === credentials?.email);

        if (user && bcrypt.compareSync(credentials!.password, user.password)) {
          return user;
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.permissions = token.permissions as string[];
      }
      return session;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: any;
    }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions;

        if (account) {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;

          const refreshToken = await generateRefreshToken(user);
          
          NextResponse.json({}).headers.append(
            "Set-Cookie",
            `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=86400; Secure; SameSite=Strict`
          );
        }
      }

      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

async function generateRefreshToken(user: User) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const refreshToken = await new SignJWT({ id: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return refreshToken;
}

export const hasPermission = (userPermissions: string[], requiredPermission: string) => {
  return userPermissions.includes(requiredPermission);
};