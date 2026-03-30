import { Category } from "@/types/categories.types";
import CreateBtn from "../CreateBtn";
import SearchableSelect, { OptionType } from "../SearchableSelect";
import { Supplier } from "@/types/suppliers.types";

interface ProductFormProps {
  productName: string;
  categoryId: string;
  unitPrice: number;
  stockQuantity: number;
  supplierId: string;
  description: string;

  categories: Category[];
  suppliers: Supplier[];

  setProductName: (val: string) => void;
  setCategoryId: (val: string) => void;
  setUnitPrice: (val: number) => void;
  setStockQuantity: (val: number) => void;
  setSupplierId: (val: string) => void;
  setDescription: (val: string) => void;

  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export default function ProductForm({
  productName,
  categoryId,
  unitPrice,
  stockQuantity,
  supplierId,
  description,
  categories = [],
  suppliers = [],
  setProductName,
  setCategoryId,
  setUnitPrice,
  setStockQuantity,
  setSupplierId,
  setDescription,
  onSubmit,
  onCancel,
  isEditing = false,
}: ProductFormProps) {
  // Convert data to dropdown options
  const categoryOptions: OptionType[] = categories.map((cat) => ({
    value: cat._id,
    label: cat.category_type,
  }));

  const supplierOptions: OptionType[] = suppliers.map((sup) => ({
    value: sup._id,
    label: sup.supplier_name,
  }));

  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 bg-gray-900 p-4 rounded-md shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <SearchableSelect
            id="category-select"
            options={categoryOptions}
            value={
              categoryOptions.find((opt) => opt.value === categoryId) || null
            }
            onChange={(selected) => setCategoryId(selected?.value || "")}
            placeholder="Select category"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Unit Price</label>
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(parseInt(e.target.value) || 0)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Stock Quantity</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(parseInt(e.target.value) || 0)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Supplier Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Supplier</label>
          <SearchableSelect
            id="supplier-select"
            options={supplierOptions}
            value={
              supplierOptions.find((opt) => opt.value === supplierId) || null
            }
            onChange={(selected) => setSupplierId(selected?.value || "")}
            placeholder="Select supplier"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <CreateBtn type="submit">{isEditing ? "Update" : "Create"}</CreateBtn>

        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
