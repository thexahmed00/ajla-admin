"use client";

import { logout } from "@/app/[locale]/lib/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "../../../../public/icons/logo.svg";
import { Menu, X, LayoutDashboard, MessageSquare, Store, Grid3X3, LogOut,Book,CheckSquare, User } from "lucide-react";
import Image from "next/image";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
  { name: "Vendors", href: "/dashboard/vendors", icon: Store },
  { name: "Categories", href: "/dashboard/categories", icon: Grid3X3 },
  { name: "Bookings", href: "/dashboard/bookings", icon: Book },
  { name: "Plans", href: "/dashboard/plans", icon: CheckSquare },
  { name: "Users", href: "/dashboard/users", icon: User },
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
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl glass text-text-main md:hidden hover:bg-surface-hover transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 glass p-6 flex flex-col transition-transform duration-300 ease-out md:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl tracking-[0.15em] font-bold text-text-main flex items-baseline gap-1">
                    <Image
                      src={Logo}
                      alt="AJLA"
                      width={120}
                      height={32}
                      className="object-contain mt-2"
                      priority
                    />
                    <span className="text-primary text-xs font-semibold">ADMIN</span>
                  </h1>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-surface-hover text-text-muted hover:text-text-main transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 flex-1">
          {menu.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <div
                  className={`relative px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-text-muted hover:text-text-main hover:bg-surface-hover"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary" />
                  )}
                  <Icon className="w-5 h-5" />
                  <span className={`font-medium text-sm ${active ? 'font-semibold' : ''}`}>
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="pt-6 border-t border-border/50">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 rounded-xl bg-background/50 border border-border text-text-muted text-sm hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
