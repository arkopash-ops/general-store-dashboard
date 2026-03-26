import { ButtonProps } from "@/types/buttonProps.types";

export default function CreateBtn({
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
    >
      {children}
    </button>
  );
}
