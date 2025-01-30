import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    return <div className="flex h-screen justify-center items-center font-semibold">Access Denied</div>;
  }

  return <div className="flex h-screen justify-center items-center font-semibold">Welcome to the admin page</div>;
}
