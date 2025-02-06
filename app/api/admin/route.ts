import { parseCookies } from "@/lib/cookies";
import { verifyAccessToken } from "@/lib/jwt";

export async function POST(req: any) {
  const cookieHeader = req.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);
  const accessToken = cookies.accessToken;

  if (accessToken) {
    const user = await verifyAccessToken(accessToken);
    if (user) {
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify({}), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}
