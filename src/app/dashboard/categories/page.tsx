"use client";

import { useEffect, useState } from "react";

interface Category {
  _id: string;
  category_type: string;
  description?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryType, setCategoryType] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchCategories();
    })();
  }, []);

  const resetForm = () => {
    setCategoryType("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryType.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/api/categories/${editingId}`
        : "/api/categories";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_type: categoryType, description }),
      });

      const data = await res.json();
      if (data.success) {
        fetchCategories();
        resetForm();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error submitting category:", err);
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat._id);
    setCategoryType(cat.category_type);
    setDescription(cat.description || "");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-gray-100 rounded-md">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-gray-900 p-4 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-4">All Categories</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900 text-gray-100">
            <tr>
              <th className="border border-red-700 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-red-700 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-red-700 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-700 transition">
                <td className="border border-red-700 px-4 py-2">
                  {cat.category_type}
                </td>
                <td className="border border-red-700 px-4 py-2">
                  {cat.description}
                </td>
                <td className="border border-red-700 px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded-md text-white transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-md text-white transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-400">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
