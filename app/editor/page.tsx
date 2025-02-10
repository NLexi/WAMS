import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function EditorPage() {
    const session = await getServerSession(authOptions);

    if (session?.user?.role === "EDITOR" || session?.user?.role === "ADMIN") {
        return (
            <div className="flex h-screen justify-center items-center font-semibold">Welcome to the editor page</div>
        )
    }
    return redirect('/dashboard');
}
