import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AssetTable from "@/components/assets/AssetTable";

export default async function AdminAssetListPage() {
    const supabase = await createClient();

    const { data: assets } = await supabase
        .from("assets")
        .select(
        `
        *,
        categories(name),
        departments(name),
        users(full_name)
        `
        )
        .order("created_at", { ascending: false });

    return (
        <div className="p-6">
        <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-bold">Assets</h1>

            <a
            href="/admin/assets/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
            + Add Asset
            </a>
        </div>

        <AssetTable assets={assets || []} isAdmin={true} />
        </div>
    );
}
