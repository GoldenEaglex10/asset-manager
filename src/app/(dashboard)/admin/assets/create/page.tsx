import AssetForm from "@/components/assets/AssetForm";
import { createClient } from "@/utils/supabase/server";

export default async function AdminCreateAssetPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase.from("categories").select("*");
  const { data: departments } = await supabase.from("departments").select("*");

  async function handleSubmit(formData: any) {}

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Asset</h1>

      <AssetForm
        types={{ categories: categories ?? [], departments: departments ?? [] }}
        onSubmit={async (formData) => {
          const res = await fetch("/api/assets/create", {
            method: "POST",
            body: JSON.stringify(formData),
          });

          if (res.ok) {
            window.location.href = "/admin/assets";
          } else {
            alert("Failed to save asset.");
          }
        }}
      />
    </div>
  );
}
