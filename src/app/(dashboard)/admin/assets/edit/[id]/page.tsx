import AssetForm from "@/components/assets/AssetForm";
import { createClient } from "@/utils/supabase/server";

export default async function EditAssetAdmin({ params }: any) {
    const supabase = await createClient();
    const assetId = params.id;

    // Load asset data
    const { data: asset } = await supabase
        .from("assets")
        .select("*")
        .eq("id", assetId)
        .single();

    // Load categories & departments
    const { data: categories } = await supabase.from("categories").select("*");
    const { data: departments } = await supabase.from("departments").select("*");

    if (!asset) {
        return <div className="p-6">Asset not found.</div>;
    }

    return (
        <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Asset</h1>

        <AssetForm
            types={{ categories: categories ?? [], departments: departments ?? [] }}
            onSubmit={async (formData) => {
            const res = await fetch("/api/assets/update", {
                method: "POST",
                body: JSON.stringify({ id: assetId, ...formData }),
            });

            if (res.ok) {
                window.location.href = "/admin/assets";
            } else {
                alert("Failed to update asset.");
            }
            }}
            loading={false}
            // Prefill form data
            initialData={asset}
        />
        </div>
    );
}
