"use client";

import Link from "next/link";
import { Galaxy, Search } from "lucide-react";
import CartButton from "@/components/cart/cart-button";
import ThemeToggle from "@/components/ui/theme-toggle";
import { NAV_ITEMS } from "@/config/navigation";
import HeaderSearch from "./header-search";
import MobileMenu from "./mobile-menu";


export default function Header() {
    return (
        <header className="fixed top-0 inset-x-0 z-50 w-full pt-4 px-4 sm:px-6 font-sans">
            <div className="max-w-[1220px] mx-auto relative rounded-full pl-4 pr-2.5 sm:px-7 py-2.5 flex items-center justify-between gap-3 bg-[#EFF6FF]/75 dark:bg-[#091526]/75 backdrop-blur-md transition-colors duration-300 motion-safe:animate-fade-down">
                <Link href="/" className="flex items-center gap-2.5 shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1B4F8A] text-white dark:bg-[#EFF6FF] dark:text-[#091526] shrink-0">
                        <Galaxy aria-hidden="true" className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <div className="flex flex-col leading-[1.08]">
                        <span className="text-[15px] font-bold tracking-tight text-[#1B4F8A] dark:text-[#EFF6FF]">
                            Giunti
                        </span>
                        <span className="text-[15px] font-bold tracking-tight text-[#1B4F8A] dark:text-[#EFF6FF]">
                            Psychometrics
                        </span>
                    </div>
                </Link>

                <nav
                    aria-label="Navigazione principale"
                    className="hidden lg:flex items-center lg:gap-6 xl:gap-8"
                >
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-[15.5px] font-medium text-[#0F2D52] hover:text-[#0EA5E9] dark:text-[#EFF6FF] dark:hover:text-[#0EA5E9] transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <HeaderSearch />

                    <button
                        type="button"
                        aria-label="Cerca prodotti"
                        className="hidden sm:flex lg:hidden w-9 h-9 rounded-full items-center justify-center border border-[#1B4F8A]/25 dark:border-[#EFF6FF]/25 text-[#0F2D52] dark:text-[#EFF6FF] hover:border-[#0EA5E9] hover:text-[#0EA5E9] dark:hover:border-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors cursor-pointer"
                    >
                        <Search className="w-4 h-4" strokeWidth={1.8} />
                    </button>

                    <ThemeToggle />

                    <CartButton />

                    <button
                        type="button"
                        className="hidden sm:inline-flex items-center h-9 px-5 rounded-full text-[15px] font-semibold text-white bg-[#1B4F8A] hover:bg-[#0EA5E9] dark:bg-[#1B4F8A] dark:hover:bg-[#0EA5E9] transition-colors cursor-pointer"
                    >
                        Accedi
                    </button>

                    <MobileMenu />
                </div>
            </div>
        </header>
    );
}