import { ButtonProps } from "@/types/buttonProps.types";

export default function EditBtn({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded-md text-white transition"
    >
      {children}
    </button>
  );
}
