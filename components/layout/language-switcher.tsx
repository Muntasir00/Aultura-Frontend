"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
    const locale = useLocale(); // বর্তমান ল্যাঙ্গুয়েজ (en বা es)
    const router = useRouter();
    const pathname = usePathname();

    // ল্যাঙ্গুয়েজ চেঞ্জ করার ফাংশন
    const handleSwitch = (newLocale: string) => {
        // বর্তমান পাথে ল্যাঙ্গুয়েজ প্রিফিক্স পরিবর্তন করা হচ্ছে
        // যেমন: /en/about -> /es/about
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.replace(newPath);
    };

    return (
        <div className="flex items-center gap-1 p-1 rounded-lg border bg-slate-100 border-slate-200 dark:bg-slate-900 dark:border-slate-800">
            {/* English Button */}
            <button
                onClick={() => handleSwitch("en")}
                className={cn(
                    "px-3 py-1 rounded-md text-[10px] font-black tracking-widest transition-all",
                    locale === "en"
                        ? "bg-blue-600 text-white shadow-sm" // Active Style
                        : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" // Inactive Style
                )}
            >
                EN
            </button>

            {/* Spanish Button */}
            <button
                onClick={() => handleSwitch("es")}
                className={cn(
                    "px-3 py-1 rounded-md text-[10px] font-black tracking-widest transition-all",
                    locale === "es"
                        ? "bg-blue-600 text-white shadow-sm" // Active Style
                        : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" // Inactive Style
                )}
            >
                ES
            </button>
        </div>
    );
}