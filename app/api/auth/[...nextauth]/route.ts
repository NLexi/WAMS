import NextAuth, { AuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { SignJWT } from "jose";
import { PrismaClient } from "@prisma/client";
import { Permissions } from "@/types/next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        const dbUser = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { department: true },
        });
        if (!dbUser) {
          throw new Error("Invalid email or password");
        }
        const isValidPassword = bcrypt.compareSync(
          credentials.password,
          dbUser.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }
        let permissions: Permissions = {};
        if (dbUser.role === "ADMIN") {
          permissions = {
            dashboard: ["GET", "POST", "PUT", "DELETE"],
            settings: ["GET", "POST", "PUT", "DELETE"],
            blog: ["GET", "POST", "PUT", "DELETE"],
          };
        } else if (dbUser.department) {
          try {
            permissions = dbUser.department.permissions
              ? JSON.parse(dbUser.department.permissions)
              : {};
          } catch (error) {
            permissions = {};
          }
        }
        return {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name || "",
          role: dbUser.role,
          permissions,
          departmentId: dbUser.departmentId || undefined,
        };
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
        session.user.permissions = token.permissions as Permissions;
        session.user.departmentId = token.departmentId as string | undefined;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions;
        token.departmentId = user.departmentId;
        token.expires_at = Date.now() + 7 * 24 * 60 * 60 * 1000;
      }
      return token;
    },
  },
  events: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        const refreshToken = await generateRefreshToken(user);
        NextResponse.next().cookies.set({
          name: "refreshToken",
          value: refreshToken,
          httpOnly: true,
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }
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

export const hasPermission = (
  userPermissions: string[],
  requiredPermission: string
): boolean => {
  return (
    userPermissions.includes("ALL") ||
    userPermissions.includes(requiredPermission)
  );
};
