import NextAuth, { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";
import { Permissions } from "@/types/next-auth";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
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
      async authorize(credentials, req) {
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
    async signIn({ user }) {
      if (user) {
        const refreshToken = await generateRefreshToken({
          id: user.id,
          role: user.role,
          departmentId: user.departmentId,
        });
        (await cookies()).set("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "strict",
          maxAge: 604800,
        });
      }
      return true;
    },
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
    async jwt({ token, user, trigger }) {
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
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

export const hasPermission = (
  userPermissions: string[],
  requiredPermission: string
): boolean => {
  return (
    userPermissions.includes("ALL") ||
    userPermissions.includes(requiredPermission)
  );
};

async function generateRefreshToken(user: {
  id: string;
  role: string;
  departmentId?: string;
}) {
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
