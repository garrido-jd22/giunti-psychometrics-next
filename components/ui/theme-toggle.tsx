"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === null ? undefined : isDark}
            aria-label={isDark ? "Attiva tema chiaro" : "Attiva tema scuro"}
            title={isDark ? "Tema chiaro" : "Tema scuro"}
            className="relative w-9 h-9 rounded-full flex items-center justify-center border border-[#1B4F8A]/25 dark:border-[#EFF6FF]/25 text-[#0F2D52] dark:text-[#EFF6FF] hover:border-[#0EA5E9] hover:text-[#0EA5E9] dark:hover:border-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors cursor-pointer"
        >
            <Sun
                aria-hidden="true"
                className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 dark:absolute"
                strokeWidth={1.8}
            />
            <Moon
                aria-hidden="true"
                className="w-4 h-4 transition-transform duration-300 absolute rotate-90 scale-0 dark:static dark:rotate-0 dark:scale-100"
                strokeWidth={1.8}
            />
        </button>
    );
}
