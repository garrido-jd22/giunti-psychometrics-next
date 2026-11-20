"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { cart } from "@/lib/services/cart.service";

export default function CartButton() {
    const { count, isOpen } = useCart();
    const label = count > 0 ? `Carrello, ${count} prodotti` : "Carrello";

    return (
        <button
            type="button"
            aria-label={label}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            onClick={cart.open}
            className="relative w-9 h-9 rounded-full flex items-center justify-center border border-[#1B4F8A]/25 dark:border-[#EFF6FF]/25 text-[#0F2D52] dark:text-[#EFF6FF] hover:border-[#0EA5E9] hover:text-[#0EA5E9] dark:hover:border-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors cursor-pointer"
        >
            <ShoppingCart aria-hidden="true" className="w-4 h-4" strokeWidth={1.8} />
            {count > 0 && (
                <span
                    key={count}
                    aria-hidden="true"
                    className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-[#0EA5E9] ring-2 ring-[#EFF6FF] dark:ring-[#091526] motion-safe:animate-dropdown-in"
                >
                    {count > 99 ? "99+" : count}
                </span>
            )}
        </button>
    );
}
