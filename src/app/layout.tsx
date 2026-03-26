import type { Metadata } from "next";
import "./globals.css";
import NavLinks from "@/ui/nav-links";

export const metadata: Metadata = {
  title: "Dashboard for General Store",
  description: "NextJS App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 p-4 sticky top-0 h-screen text-gray-300">
          <h1 className="text-xl font-bold mb-6 text-white">Dashboard</h1>
          <NavLinks />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-800 text-gray-100 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
