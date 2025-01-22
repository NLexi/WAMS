import rolePaths from "@/lib/rolePaths";

export async function POST(req: Request) {
  const { role, path }: { role: string; path: string } =
    await req.json();
  if (!role || !path ) {
    return new Response(
      JSON.stringify({ message: "Role and path are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const roleData = rolePaths[role];
  if (!roleData) {
    return new Response(
      JSON.stringify({ message: "Invalid role" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const hasAccess = roleData[path]
  if (!hasAccess) {
    return new Response(
      JSON.stringify({ message: "Unauthorized Page" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ message: "Access granted" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
