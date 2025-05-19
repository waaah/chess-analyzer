import { ChessUser } from "@/types/chess-user";
import { jwtVerify, SignJWT } from "jose";

export const createToken = async (user: ChessUser) => {
  const key = new TextEncoder().encode(process.env.JWT_SIGN_SECRET);
  return await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
};

export const verifyToken = async (token: string) => {
  try {
    const key = new TextEncoder().encode(process.env.JWT_SIGN_SECRET);
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
};
