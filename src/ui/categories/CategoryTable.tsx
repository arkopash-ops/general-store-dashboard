import EditBtn from "../EditBtn";
import DeleteBtn from "../DeleteBtn";

interface Category {
  _id: string;
  category_type: string;
  description?: string;
}

interface CategoryTableProps {
  categories: Category[];
  onEdit: (cat: Category) => void;
  onDelete: (id: string) => void;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-900 text-gray-100">
          <tr>
            <th className="border border-red-700 px-4 py-2 text-left">Name</th>
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
                <EditBtn onClick={() => onEdit(cat)}>Edit</EditBtn>
                <DeleteBtn onClick={() => onDelete(cat._id)}>Delete</DeleteBtn>
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
  );
}
