import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Sync Supabase session cookies
  let response = await updateSession(request);

  const path = request.nextUrl.pathname;
  const isPublic = path === "/" || path === "/login";

  
  const token =
    request.cookies.get(
      `sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split("//")[1].split(".")[0]}-auth-token`
    )?.value ?? null;

 
  if (!isPublic && !token) {
    const url = new URL("/login", request.url);
    response = NextResponse.redirect(url);
    return response;
  }

  
  if (isPublic && token) {
    const url = new URL("/user/dashboard", request.url);
    response = NextResponse.redirect(url);
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
