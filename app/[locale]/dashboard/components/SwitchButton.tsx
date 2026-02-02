"use client";

import { usePathname, useRouter } from "@/i18n";
import { useLocale } from "next-intl";

const locales = ["en", "ar"] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (nextLocale: "en" | "ar") => {
    // Remove the current locale from the pathname
    const segments = pathname.split("/").filter(Boolean);

    if (locales.includes(segments[0] as any)) {
      segments.shift();
    }

    const cleanPath = "/" + segments.join("/");

    router.replace(cleanPath || "/", { locale: nextLocale });
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
