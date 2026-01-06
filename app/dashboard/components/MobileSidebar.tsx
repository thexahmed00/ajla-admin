"use client";

import { logout } from "@/app/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const menu = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Conversations", href: "/dashboard" },
  { name: "Vendors", href: "/dashboard/vendors" },
  { name: "Categories", href: "/dashboard/categories" },
];

export default function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
    const router = useRouter();
  
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Floating Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1C1C1C] border border-[#2A2A2A] text-xl text-white md:hidden"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-[#1C1C1C] border-r border-[#2A2A2A] p-6 flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
      >
        <h1 className="text-2xl tracking-widest mb-10">
          AJLA <span className="text-[#FF7F41] text-sm">ADMIN</span>
        </h1>

        <nav className="space-y-2">
          {menu.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
              >
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
          <button onClick={handleLogout} className="w-full py-2 rounded-lg bg-[#121212] border border-[#2A2A2A] text-sm">
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
