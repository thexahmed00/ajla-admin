// "use client";

// import { logout } from "@/app/[locale]/lib/auth";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { LayoutDashboard, MessageSquare, Store, Grid3X3, LogOut, Book, CheckSquare, User } from "lucide-react";
// import Image from "next/image";
// import Logo from "../../../../public/icons/logo.svg"
// const menu = [
//   { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//   { name: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
//   { name: "Vendors", href: "/dashboard/vendors", icon: Store },
//   { name: "Categories", href: "/dashboard/categories", icon: Grid3X3 },
//   { name: "Bookings", href: "/dashboard/bookings", icon: Book },
//   { name: "Plans", href: "/dashboard/plans", icon: CheckSquare },
//   { name: "Users", href: "/dashboard/users", icon: User },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const handleLogout = () => {
//     logout();
//     router.push("/login");
//   };

//   return (
//     <aside className="w-64 bg-surface/50 backdrop-blur-sm border-r border-border p-6 flex flex-col h-screen sticky top-0">
//       {/* Logo */}
//       <div className="mb-10">
//         <h1 className="text-2xl tracking-[0.15em] font-bold text-text-main flex items-baseline gap-1">
//   <Image
//     src={Logo}   // public/ajla-logo.jpeg
//     alt="AJLA"
//     width={120}
//     height={32}
//     className="object-contain mt-2"
//     priority
//   />

//   <span className="text-primary text-xs font-semibold">
//     ADMIN
//   </span>
// </h1>
//         {/* <h1 className="text-2xl tracking-[0.15em] font-bold text-text-main flex items-baseline gap-1"> AJLA <span className="text-primary text-xs font-semibold tracking-wider">ADMIN</span> </h1> */}
//         <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
//       </div>

//       {/* Navigation */}
//       <nav className="space-y-1.5 flex-1">
//         {menu.map((item, index) => {
//           const active =
//             pathname === item.href ||
//             (item.href !== "/dashboard" && pathname.startsWith(item.href));
//           const Icon = item.icon;

//           return (
//             <Link key={item.name} href={item.href}>
//               <div
//                 className={`relative px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group flex items-center gap-3
//                   ${active
//                     ? "bg-primary/10 text-primary"
//                     : "text-text-muted hover:text-text-main hover:bg-surface-hover"
//                   }`}
//               >
//                 {/* Active indicator */}
//                 <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-primary transition-all duration-300 ${active ? 'h-6 opacity-100' : 'h-0 opacity-0'}`} />

//                 {/* Icon */}
//                 <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />

//                 {/* Label */}
//                 <span className={`font-medium text-sm ${active ? 'font-semibold' : ''}`}>
//                   {item.name}
//                 </span>

//                 {/* Hover glow effect */}
//                 {active && (
//                   <div className="absolute inset-0 rounded-xl bg-primary/5 pointer-events-none" />
//                 )}
//               </div>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Logout Button */}
//       <div className="pt-6 border-t border-border/50">
//         <button
//           onClick={handleLogout}
//           className="w-full py-3 px-4 rounded-xl bg-background/50 border border-border text-text-muted text-sm 
//             hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/5
//             transition-all duration-200 cursor-pointer
//             flex items-center justify-center gap-2 group"
//         >
//           <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }
"use client";

import { logout } from "@/app/[locale]/lib/auth";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Store,
  Grid3X3,
  LogOut,
  Book,
  CheckSquare,
  User
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Logo from "../../../../public/icons/logo.svg";
import LanguageSwitcher from "./SwitchButton";

const menu = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "conversations", href: "/dashboard/conversations", icon: MessageSquare },
  { key: "vendors", href: "/dashboard/vendors", icon: Store },
  { key: "categories", href: "/dashboard/categories", icon: Grid3X3 },
  { key: "bookings", href: "/dashboard/bookings", icon: Book },
  { key: "plans", href: "/dashboard/plans", icon: CheckSquare },
  { key: "users", href: "/dashboard/users", icon: User }
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useParams();
  const t = useTranslations("sidebar");

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/login`);
  };
  

  return (
    <aside className="w-64 bg-surface/50 backdrop-blur-sm border-r border-border p-6 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      {/* <LanguageSwitcher /> */}
      <div className="mb-10">
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
        <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="space-y-1.5 flex-1">
        {menu.map((item) => {
          const fullHref = `/${locale}${item.href}`;
          const active =
            pathname === fullHref ||
            (item.href !== "/dashboard" && pathname.startsWith(fullHref));

          const Icon = item.icon;

          return (
            <Link key={item.key} href={fullHref}>
              <div
                className={`relative px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group flex items-center gap-3
                  ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-text-muted hover:text-text-main hover:bg-surface-hover"
                  }`}
              >
                <div
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-primary transition-all duration-300 ${
                    active ? "h-6 opacity-100" : "h-0 opacity-0"
                  }`}
                />

                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    active ? "scale-110" : "group-hover:scale-110"
                  }`}
                />

                <span className={`font-medium text-sm ${active ? "font-semibold" : ""}`}>
                  {t(item.key)}
                </span>

                {active && (
                  <div className="absolute inset-0 rounded-xl bg-primary/5 pointer-events-none" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="pt-6 border-t border-border/50">
        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 rounded-xl bg-background/50 border border-border text-text-muted text-sm 
            hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/5
            transition-all duration-200 cursor-pointer
            flex items-center justify-center gap-2 group"
        >
          <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>{t("logout")}</span>
        </button>
      </div>
    </aside>
  );
}
