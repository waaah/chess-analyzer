import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./utils/jwt";

export async function middleware(request: NextRequest) {
  const protectedPaths = ["/analyze", "/games", "/api/logout"];
  const publicPaths = ["/"];

  const userToken = (await cookies()).get("userToken")?.value;

  if (protectedPaths.includes(request.nextUrl.pathname)) {
    const verifiedToken = await verifyToken(userToken || "");
    // redirect to index if token is invalid
    if (!verifiedToken) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  // redirect to
  if (publicPaths.includes(request.nextUrl.pathname)) {
    const verifiedToken = await verifyToken(userToken || "");
    if (verifiedToken) {
      return NextResponse.redirect(new URL(protectedPaths[0], request.nextUrl));
    }
  }

  return NextResponse.next();
}
