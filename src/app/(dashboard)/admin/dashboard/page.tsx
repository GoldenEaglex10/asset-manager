import { createClient } from "@/utils/supabase/server";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cookies } from "next/headers";

export default async function AdminDashboardPage() {
    const cookieStore = await cookies();
    const supabase = await createClient();

    // ---- Fetch counts ----
    const { count: assetCount } = await supabase
        .from("assets")
        .select("*", { head: true, count: "exact" });

    const { count: usersCount } = await supabase
        .from("users")
        .select("*", { head: true, count: "exact" });

    const { count: catCount } = await supabase
        .from("categories")
        .select("*", { head: true, count: "exact" });

    const { count: deptCount } = await supabase
        .from("departments")
        .select("*", { head: true, count: "exact" });

    // ---- Fetch recent activity logs ----
    const { data: logs } = await supabase
        .from("activity_logs")
        .select("*, users(full_name)")
        .order("created_at", { ascending: false })
        .limit(5);

    return (
        
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Assets" value={assetCount ?? 0} />
            <StatCard title="Users" value={usersCount ?? 0} />
            <StatCard title="Categories" value={catCount ?? 0} />
            <StatCard title="Departments" value={deptCount ?? 0} />
            </div>

            {/* Latest Activity Logs */}
            <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

            {logs?.length ? (
                <ul className="divide-y">
                {logs.map((log) => (
                    <li key={log.id} className="py-3">
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-gray-600">
                        {log.created_at} •{" "}
                        {log.users?.full_name || "Unknown user"}
                    </p>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-sm">No recent activity.</p>
            )}
            </div>
        </div>
        
    );
    }

    // ----------------
    // Stat Card Component
    // ----------------
    function StatCard({ title, value }: { title: string; value: any }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}
