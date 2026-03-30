"use client";

import EditBtn from "../EditBtn";
import DeleteBtn from "../DeleteBtn";
import { Product } from "@/types/products.types";
import {
  TagIcon,
  CubeIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

interface ProductCardProps {
  products: Product[];
  onEdit: (prod: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductCard({
  products,
  onEdit,
  onDelete,
}: ProductCardProps) {
  if (products.length === 0) {
    return (
      <div className="text-gray-400 text-center py-6 bg-linear-to-br from-gray-900 to-black rounded-lg border border-red-800 shadow-inner">
        No products found
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((prod) => (
        <div
          key={prod._id}
          className="group relative bg-linear-to-br from-[#0f0f0f] to-[#1a1a1a] text-gray-100 p-5 rounded-xl border border-red-900 shadow-lg hover:shadow-red-900/40 hover:border-red-600 transition-all duration-300"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-red-900/10 blur-xl"></div>

          {/* Product Info */}
          <div className="mb-3 border-b border-red-900 pb-2">
            <h3 className="text-xl font-bold text-red-400 tracking-wide">
              {prod.product_name}
            </h3>
            {prod.description && (
              <p className="text-sm text-gray-400 mt-1">{prod.description}</p>
            )}
          </div>

          {/* Category & Price */}
          <div className="mb-3 flex items-center gap-2 text-gray-400 text-sm">
            <TagIcon className="w-5 h-5 text-red-400" />
            <span>{prod.category_id?.category_type || "-"}</span>
            <span className="mx-1">•</span>
            <CubeIcon className="w-5 h-5 text-red-400" />
            <span>₹{prod.unit_price.toFixed(2)}</span>
          </div>

          {/* Stock & Supplier */}
          <div className="mb-3">
            <div className="flex items-center gap-2 text-red-300 font-semibold mb-1">
              <BuildingOfficeIcon className="w-5 h-5" />
              Supplier
            </div>
            <div className="text-sm text-gray-400">
              {prod.supplier_id
                ? `${prod.supplier_id.supplier_name}${
                    prod.supplier_id.supplier_company?.name
                      ? ` (${prod.supplier_id.supplier_company.name})`
                      : ""
                  }`
                : "-"}
            </div>
          </div>

          {/* Stock */}
          <div className="mb-3">
            <div className="flex items-center gap-2 text-red-300 font-semibold mb-1">
              Stock
            </div>
            <div className="text-sm text-gray-400">{prod.stock_quantity}</div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <EditBtn onClick={() => onEdit(prod)}>Edit</EditBtn>
            <DeleteBtn onClick={() => onDelete(prod._id)}>Delete</DeleteBtn>
          </div>
        </div>
      ))}
    </div>
  );
}
