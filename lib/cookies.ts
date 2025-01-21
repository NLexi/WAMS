export function parseCookies(
  cookieHeader: string | undefined
): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...value] = cookie.split("=");
    cookies[name.trim()] = decodeURIComponent(value.join("="));
  });

  return cookies;
}
