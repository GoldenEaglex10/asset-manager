import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
try {
const cookieStore = await cookies();
const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
    cookies: {
        getAll() {
        return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
        );
        },
    },
    }
);

const form = await req.json();

// Get authenticated user
const { data: auth, error: authError } = await supabase.auth.getUser();
const userId = auth.user?.id;

if (authError || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// Validate required fields
if (
    !form.asset_name ||
    !form.category_id ||
    !form.department_id ||
    !form.date_purchased ||
    form.cost === undefined
) {
    return NextResponse.json(
    { error: "Missing required fields" },
    { status: 400 }
    );
}

// Insert asset and return the created record using .select()
const { data, error } = await supabase
    .from("assets")
    .insert({
    asset_name: form.asset_name,
    category_id: form.category_id,
    department_id: form.department_id,
    date_purchased: form.date_purchased,
    cost: form.cost,
    description: form.description || null,
    serial_number: form.serial_number || null,
    status: form.status || "active",
    created_by: userId,
    })
    .select() 

if (error) {
    console.error("Asset creation error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
}

// Now data is guaranteed to exist and is a single object (not array)
if (!data) {
    return NextResponse.json(
    { error: "Failed to create asset" },
    { status: 500 }
    );
}

// Log activity
await supabase.from("activity_logs").insert({
    user_id: userId,
    action: "Created new asset",
    entity_type: "asset",
    entity_id: data.id, 
    details: {
    asset_name: form.asset_name,
    cost: form.cost,
    },
});

return NextResponse.json(
    { success: true, asset: data }, 
    { status: 201 }
);
} catch (error) {
console.error("Unexpected error:", error);
return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
);
}
}