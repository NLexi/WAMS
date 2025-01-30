import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import BlogClient from "./blogClient";

export default async function BlogPage() {
  const session = await getServerSession(authOptions);

  return <BlogClient session={session} />;
}
