import CreateBtn from "../CreateBtn";

interface CategoryFormProps {
  categoryType: string;
  description: string;
  setCategoryType: (val: string) => void;
  setDescription: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export default function CategoryForm({
  categoryType,
  description,
  setCategoryType,
  setDescription,
  onSubmit,
  onCancel,
  isEditing = false,
}: CategoryFormProps) {
  return (
    <form
      onSubmit={onSubmit}
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
