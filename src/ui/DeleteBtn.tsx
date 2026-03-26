import { ButtonProps } from "@/types/buttonProps.types";

export default function DeleteBtn({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-md text-white transition"
    >
      {children}
    </button>
  );
}
