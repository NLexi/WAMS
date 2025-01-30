import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import { LogoutButton } from "@/components/logoutButton";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-2">
            <h1 className="font-bold text-lg">Dashboard</h1>
            <p>Welcome, {session?.user?.name}</p>
            <Link href="/blog">
                <button className="bg-blue-200 p-2 px-4 rounded-md">Blog</button>
            </Link>
            <div className="flex flex-row gap-4 justify-evenly">
                {
                    session?.user?.role === 'ADMIN' ?
                        <Link href="/admin">
                            <button className="bg-green-200 p-2 px-4 rounded-md">Admin</button>
                        </Link> :
                        <></>
                }
                {
                    ((session?.user?.role === 'ADMIN') || (session?.user?.role === 'EDITOR')) ?
                        <Link href="/editor">
                            <button className="bg-blue-200 p-2 px-4 rounded-md">Editor</button>
                        </Link> :
                        <></>
                }
            </div>
            <LogoutButton />
        </div >
    );
}
