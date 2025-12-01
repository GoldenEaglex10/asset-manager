export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-6">
            <h1 className="text-xl font-bold mb-6">Asset Manager</h1>

            <nav className="space-y-3">
            <a href="/admin/dashboard" className="block hover:text-blue-300">Dashboard</a>
            <a href="/admin/assets" className="block hover:text-blue-300">Assets</a>
            <a href="/admin/users" className="block hover:text-blue-300">Users</a>
            <a href="/admin/categories" className="block hover:text-blue-300">Categories</a>
            <a href="/admin/departments" className="block hover:text-blue-300">Departments</a>
            </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-10">
            {children}
        </main>
        </div>
    );
}
