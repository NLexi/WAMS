import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: string;
      permissions: string[];
    };
  }

  interface User {
    id: string;
    role: string;
    permissions: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    expires_at?: number;
    refreshToken: string;
    permissions: string[];
  }
}
