"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UserIcon,
} from "@heroicons/react/24/outline";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: Squares2X2Icon,
  },
  {
    name: "Suppliers",
    href: "/dashboard/suppliers",
    icon: UserIcon,
  },
    {
    name: "Products",
    href: "/dashboard/products",
    icon: ShoppingBagIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 bg-gray-900 p-2 rounded-md">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`
              flex items-center gap-2 rounded-md p-2 text-sm font-medium
              ${
                isActive
                  ? "bg-red-900 text-red-500"
                  : "text-gray-300 hover:bg-red-800 hover:text-red-400"
              }
            `}
          >
            <LinkIcon className="w-5" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
