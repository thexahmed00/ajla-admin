"use client";

import { usePathname, useRouter } from "@/i18n";
import { useLocale } from "next-intl";


export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (nextLocale: "en" | "ar") => {
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLocale("en")}
        className={locale === "en" ? "font-bold" : ""}
      >
        EN
      </button>

      <button
        onClick={() => switchLocale("ar")}
        className={locale === "ar" ? "font-bold" : ""}
      >
        AR
      </button>
    </div>
  );
}
