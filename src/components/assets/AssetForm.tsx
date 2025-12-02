"use client";

import { useState, useEffect } from "react";

export default function AssetForm({
  types,
  onSubmit,
  initialData,
  loading = false,
}: {
  types: { categories: any[]; departments: any[] };
  onSubmit: (formData: any) => void;
  initialData?: any;
  loading?: boolean;
}) {
    const [form, setForm] = useState(
    initialData || {
    asset_name: "",
    category_id: "",
    department_id: "",
    date_purchased: "",
    cost: "",
    serial_number: "",
    status: "active",
    description: "",
}
    );

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = (e: any) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={submitForm} className="space-y-4 bg-white p-6 rounded-lg shadow">

        <div>
            <label className="block mb-1">Asset Name</label>
            <input
            name="asset_name"
            value={form.asset_name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            />
        </div>

        <div>
            <label className="block mb-1">Category</label>
            <select
            name="category_id"
            required
            value={form.category_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            >
            <option value="">Select category</option>
            {types.categories.map((c) => (
                <option key={c.id} value={c.id}>
                {c.name}
                </option>
            ))}
            </select>
        </div>

        <div>
            <label className="block mb-1">Department</label>
            <select
            name="department_id"
            required
            value={form.department_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            >
            <option value="">Select department</option>
            {types.departments.map((d) => (
                <option key={d.id} value={d.id}>
                {d.name}
                </option>
            ))}
            </select>
        </div>

        <div>
            <label className="block mb-1">Date Purchased</label>
            <input
            name="date_purchased"
            type="date"
            required
            value={form.date_purchased}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            />
        </div>

        <div>
            <label className="block mb-1">Cost</label>
            <input
            name="cost"
            type="number"
            step="0.01"
            required
            value={form.cost}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            />
        </div>

        <div>
            <label className="block mb-1">Serial Number</label>
            <input
            name="serial_number"
            value={form.serial_number}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            />
        </div>

        <div>
            <label className="block mb-1">Status</label>
            <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            </select>
        </div>

        <div>
            <label className="block mb-1">Description</label>
            <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            />
        </div>

        <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
            {loading ? "Saving..." : "Save Asset"}
        </button>
        </form>
    );
}
