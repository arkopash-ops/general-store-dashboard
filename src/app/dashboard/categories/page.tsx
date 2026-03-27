"use client";

import { useEffect, useState } from "react";
import CategoryForm from "@/ui/categories/CategoryForm";
import CategoryTable from "@/ui/categories/CategoryTable";
import { Category } from "@/types/categories.types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryType, setCategoryType] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

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
    if (!categoryType.trim()) return alert("Category name is required");

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
      } else alert(data.message);
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

      <CategoryForm
        categoryType={categoryType}
        description={description}
        setCategoryType={setCategoryType}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        isEditing={!!editingId}
      />

      <h2 className="text-xl font-semibold mb-4">All Categories</h2>

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
