import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "ar"] as const;
export const defaultLocale = "en";

export const { Link, useRouter, usePathname } =
  createNavigation({ locales });
