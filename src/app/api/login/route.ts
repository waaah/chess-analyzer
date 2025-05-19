import { NextRequest } from "next/server";
import { ChessServiceFactory } from "../factory/ChessServiceFactory";
import { formatApiError } from "../utils/formatApiError";
import { cookies } from "next/headers";
import { createToken } from "@/utils/jwt";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { username, source } = body;
    const chessService = ChessServiceFactory.create(source);
    const user = await chessService.getUser(username);
    const ck = await cookies();
    const token = await createToken(user);

    ck.set("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hr
    });

    return new Response(JSON.stringify(user));
  } catch (error) {
    return formatApiError(error);
  }
}
