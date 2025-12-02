"use client";

export default function AssetTable({
    assets,
    isAdmin = false,
    }: {
    assets: any[];
    isAdmin?: boolean;
    }) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="min-w-full text-sm">
            <thead className="border-b font-medium">
            <tr>
                <th className="py-3 px-4 text-left">Asset Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Department</th>
                <th className="py-3 px-4 text-left">Cost</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
            </tr>
            </thead>

            <tbody>
            {assets.map((asset) => (
                <tr key={asset.id} className="border-b">
                <td className="py-3 px-4">{asset.asset_name}</td>
                <td className="py-3 px-4">{asset.categories?.name}</td>
                <td className="py-3 px-4">{asset.departments?.name}</td>
                <td className="py-3 px-4">${Number(asset.cost).toFixed(2)}</td>
                <td
                    className={`py-3 px-4 font-medium ${
                    asset.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                >
                    {asset.status}
                </td>

                <td className="py-3 px-4">
                    <div className="flex gap-2">
                    <a
                        href={`/view/asset/${asset.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        View
                    </a>

                    {isAdmin && (
                        <>
                        <a
                            href={`/admin/assets/edit/${asset.id}`}
                            className="text-yellow-600 hover:underline"
                        >
                            Edit
                        </a>
                        <a
                            href={`/admin/assets/delete/${asset.id}`}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </a>
                        </>
                    )}
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {assets.length === 0 && (
            <p className="text-gray-500 text-center py-6">No assets found.</p>
        )}
        </div>
    );
}
