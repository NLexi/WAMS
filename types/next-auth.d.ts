import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: string;
    permissions: Permissions;
    departmentId?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: string;
      permissions: Permisisons;
      departmentId?: string;
    };
  }
  interface JWT {
    id: string;
    role: string;
    permissions: Permissions;
    departmentId?: string;
    expires_at?: number;
    refreshToken?: string;
  }
}

export type Permissions = {
  [page: string]: string[];
};

export type DepartmentWithPermissions = {
  id: string;
  name: string;
  permissions: Permissions;
};