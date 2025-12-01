import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function UserDashboardPage() {
    const cookieStore = await cookies();
    const supabase = await createClient();

    // Get logged-in user from Supabase Auth
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData.user?.id;

    // Fetch user's assets
    const { data: assets } = await supabase
        .from("assets")
        .select("*")
        .eq("created_by", userId);

    const totalCost = assets?.reduce(
        (sum, asset) => sum + Number(asset.cost),
        0
    );

    return (
        
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard title="My Assets" value={assets?.length ?? 0} />
            <StatCard title="Total Value" value={"$" + (totalCost ?? 0).toFixed(2)} />
            <StatCard
                title="Active Assets"
                value={assets?.filter((a) => a.status === "active").length ?? 0}
            />
            </div>

            {/* Recent Assets */}
            <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">My Recent Assets</h2>

            {assets?.length ? (
                <ul className="space-y-3">
                {assets.slice(0, 5).map((asset) => (
                    <li key={asset.id} className="border-b pb-2">
                    <p>{asset.asset_name}</p>
                    <p className="text-sm text-gray-500">
                        {asset.date_purchased}
                    </p>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-gray-500">No assets yet.</p>
            )}
            </div>
        </div>
        
    );
    }

    // Local component for stat cards
    function StatCard({ title, value }: { title: string; value: any }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}
