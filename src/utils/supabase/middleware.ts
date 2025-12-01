import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    const response = NextResponse.next();

    // We must manually manage cookies in middleware
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
        cookies: {
            getAll() {
            return request.cookies.getAll();
            },
            setAll(cookieList) {
            cookieList.forEach(({ name, value, options }) => {
                response.cookies.set(name, value, options);
            });
            },
        },
        }
    );

    await supabase.auth.getSession();

    return response;
}
