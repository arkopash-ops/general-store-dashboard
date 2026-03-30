"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/ui/products/ProductForm";
import ProductCard from "@/ui/products/ProductCard";
import { Product } from "@/types/products.types";
import { Category } from "@/types/categories.types";
import { Supplier } from "@/types/suppliers.types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [supplierId, setSupplierId] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // Fetch categories & suppliers
  const fetchCategoriesAndSuppliers = async () => {
    try {
      const [catRes, supRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/suppliers"),
      ]);
      const [catData, supData] = await Promise.all([
        catRes.json(),
        supRes.json(),
      ]);
      setCategories(catData.data || []);
      setSuppliers(supData.data || []);
    } catch (err) {
      console.error("Failed to fetch categories or suppliers:", err);
    }
  };

  useEffect(() => {
    (async () => {
      fetchProducts();
      fetchCategoriesAndSuppliers();
    })();
  }, []);

  const resetForm = () => {
    setProductName("");
    setCategoryId("");
    setUnitPrice(0);
    setStockQuantity(0);
    setSupplierId("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return alert("Product name is required");

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/products/${editingId}` : "/api/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: productName,
          category_id: categoryId,
          unit_price: unitPrice,
          stock_quantity: stockQuantity,
          supplier_id: supplierId,
          description,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchProducts();
        resetForm();
      } else alert(data.message);
    } catch (err) {
      console.error("Error submitting product:", err);
    }
  };

  const handleEdit = (prod: Product) => {
    setEditingId(prod._id);
    setProductName(prod.product_name);
    setCategoryId(prod.category_id?._id || "");
    setUnitPrice(prod.unit_price);
    setStockQuantity(prod.stock_quantity);
    setSupplierId(prod.supplier_id?._id || "");
    setDescription(prod.description || "");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-gray-100 rounded-md">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <ProductForm
        productName={productName}
        categoryId={categoryId}
        unitPrice={unitPrice}
        stockQuantity={stockQuantity}
        supplierId={supplierId}
        description={description}
        categories={categories}
        suppliers={suppliers}
        setProductName={setProductName}
        setCategoryId={setCategoryId}
        setUnitPrice={setUnitPrice}
        setStockQuantity={setStockQuantity}
        setSupplierId={setSupplierId}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        isEditing={!!editingId}
      />

      <h2 className="text-xl font-semibold mb-4">All Products</h2>

      <ProductCard
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
