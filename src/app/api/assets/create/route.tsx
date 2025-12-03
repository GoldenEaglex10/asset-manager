import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
        cookies: {
            getAll: () => cookieStore.getAll(),
            setAll: (cookiesToSet) =>
            cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
            ),
        },
        }
    );

    const form = await req.json();

    const { data: auth } = await supabase.auth.getUser();
    const userId = auth.user?.id;

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
        .from("assets")
        .insert({
        ...form,
        created_by: userId,
        })
        .select()
        .single(); 

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Log activity
    await supabase.from("activity_logs").insert({
        user_id: userId,
        action: "Created new asset",
        entity_type: "asset",
        entity_id: data.id, // now safe
        details: form,
    });

    return NextResponse.json({ success: true, asset: data });
}
