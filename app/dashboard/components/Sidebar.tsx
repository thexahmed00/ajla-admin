"use client";

import { logout } from "@/app/lib/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Conversations", href: "/dashboard/conversations/1" },
  { name: "Vendors", href: "/dashboard/vendors" },
  { name: "Categories", href: "/dashboard/categories" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-[#1C1C1C] border-r border-[#2A2A2A] p-6 flex flex-col h-full">
      <h1 className="text-2xl tracking-widest mb-10">
        AJLA <span className="text-[#FF7F41] text-sm">ADMIN</span>
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link key={item.name} href={item.href}>
              <div
                className={`relative px-4 py-3 rounded-lg cursor-pointer transition ${
                  active
                    ? "bg-[#2A1A12] text-[#FF7F41]"
                    : "text-gray-300 hover:text-[#FF7F41]"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-[#FF7F41]" />
                )}
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-10">
        <button
          onClick={handleLogout}
          className="w-full py-2 rounded-lg bg-[#121212] border border-[#2A2A2A] text-sm"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
