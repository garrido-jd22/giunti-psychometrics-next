"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/config/navigation";
import { useClickOutside } from "@/hooks/use-click-outside";

export default function MobileMenu() {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const panelId = useId();

    const close = useCallback(() => setOpen(false), []);
    useClickOutside(containerRef, close, open);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    return (
        <div ref={containerRef} className="lg:hidden">
            <button
                type="button"
                aria-label={open ? "Chiudi menu" : "Apri menu"}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-[#1B4F8A]/25 dark:border-[#EFF6FF]/25 text-[#0F2D52] dark:text-[#EFF6FF] hover:border-[#0EA5E9] hover:text-[#0EA5E9] dark:hover:border-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors cursor-pointer"
            >
                {open ? <X className="w-4 h-4" strokeWidth={1.8} /> : <Menu className="w-4 h-4" strokeWidth={1.8} />}
            </button>

            {open && (
                <div
                    id={panelId}
                    className="absolute top-full inset-x-0 mt-2 p-2 rounded-3xl bg-white/95 dark:bg-[#11223A]/95 backdrop-blur-md shadow-[0_18px_45px_rgb(15,45,82,0.18)] dark:shadow-[0_18px_45px_rgb(0,0,0,0.45)] animate-toast-in"
                >
                    <nav aria-label="Navigazione mobile">
                        <ul className="flex flex-col">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        onClick={close}
                                        className="block px-4 py-3 rounded-2xl text-[16px] font-medium text-[#0F2D52] dark:text-[#EFF6FF] hover:bg-[#EFF6FF] hover:text-[#0EA5E9] dark:hover:bg-[#091526]/70 dark:hover:text-[#0EA5E9] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <button
                        type="button"
                        onClick={close}
                        className="sm:hidden mt-2 w-full h-11 rounded-full text-[15px] font-semibold text-white bg-[#1B4F8A] hover:bg-[#0EA5E9] transition-colors cursor-pointer"
                    >
                        Accedi
                    </button>
                </div>
            )}
        </div>
    );
}
