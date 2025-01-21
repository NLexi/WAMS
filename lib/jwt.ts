import { SignJWT, jwtVerify } from "jose";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "your-access-token-secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "your-refresh-token-secret";

const toUint8Array = (secret: string) => new TextEncoder().encode(secret);

export const generateAccessToken = async (user: { id: string; email: string, role: string }) => {
  return new SignJWT({ id: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(toUint8Array(ACCESS_TOKEN_SECRET));
};

export const generateRefreshToken = async (user: { id: string; email: string, role: string }) => {
  return new SignJWT({ id: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(toUint8Array(REFRESH_TOKEN_SECRET));
};

export const verifyAccessToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, toUint8Array(ACCESS_TOKEN_SECRET));
    return payload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, toUint8Array(REFRESH_TOKEN_SECRET));
    return payload;
  } catch (error) {
    return null;
  }
};
