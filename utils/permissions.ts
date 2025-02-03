import { Permissions } from "@/types/next-auth";

export const hasPagePermission = (
  permissions: Permissions,
  page: string,
  method: string
): boolean => {
  if (permissions.dashboard?.includes("ALL")) return true;
  
  return permissions[page]?.includes(method) || false;
};