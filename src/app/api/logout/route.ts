import { cookies } from "next/headers";

export async function POST() {
  const ck = await cookies();
  ck.delete("userToken");
  return new Response(JSON.stringify({ loggedOut: true }));
}
