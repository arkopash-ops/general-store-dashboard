import { connectToDB } from "@/lib/db";
import categoriesModel from "@/models/categories.model";
import productModel from "@/models/products.model";
import supplierModel from "@/models/suppliers.models";

export default async function DashboardPage() {
  await connectToDB();

  // Fetch counts and last 5 items
  const [categories, suppliers, products] = await Promise.all([
    categoriesModel.find(),
    supplierModel.find(),
    productModel.find(),
  ]);

  const [lastCategories, lastSuppliers, lastProducts] = await Promise.all([
    categoriesModel.find().sort({ createdAt: -1 }).limit(5),
    supplierModel.find().sort({ createdAt: -1 }).limit(5),
    productModel.find().sort({ createdAt: -1 }).limit(5),
  ]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100 rounded-md">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Counts */}
      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-gray-800 rounded-md text-center border-2 border-red-700">
          <h2 className="text-lg font-semibold text-red-500">Categories</h2>
          <p className="text-3xl">{categories.length}</p>
        </div>

        <div className="p-4 bg-gray-800 rounded-md text-center border-2 border-red-700">
          <h2 className="text-lg font-semibold text-red-500">Suppliers</h2>
          <p className="text-3xl">{suppliers.length}</p>
        </div>

        <div className="p-4 bg-gray-800 rounded-md text-center border-2 border-red-700">
          <h2 className="text-lg font-semibold text-red-500">Products</h2>
          <p className="text-3xl">{products.length}</p>
        </div>
      </div>

      {/* Last 5 items */}
      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="p-4 bg-gray-800 rounded-md border-2 border-red-700">
          <h2 className="font-semibold mb-2 text-red-500">Last 5 Categories</h2>
          <ul className="list-disc list-inside text-gray-200">
            {lastCategories.map((cat) => (
              <li key={cat._id}>{cat.category_type}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-gray-800 rounded-md border-2 border-red-700">
          <h2 className="font-semibold mb-2 text-red-500">Last 5 Suppliers</h2>
          <ul className="list-disc list-inside text-gray-200">
            {lastSuppliers.map((sup) => (
              <li key={sup._id.toString()}>{sup.supplier_name}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-gray-800 rounded-md border-2 border-red-700">
          <h2 className="font-semibold mb-2 text-red-500">Last 5 Products</h2>
          <ul className="list-disc list-inside text-gray-200">
            {lastProducts.map((prod) => (
              <li key={prod._id}>{prod.product_name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
