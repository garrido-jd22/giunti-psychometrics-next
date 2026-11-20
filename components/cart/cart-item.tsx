"use client";

import { memo } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { CartLine } from "@/interfaces/cart.interface";
import { cart } from "@/lib/services/cart.service";
import { formatEuro, getProductHref } from "@/lib/products";

interface CartItemProps {
    line: CartLine;
}

function CartItem({ line }: CartItemProps) {
    const { product, quantity, subtotal } = line;

    return (
        <li className="flex gap-3.5 p-3 rounded-2xl bg-[#EFF6FF]/70 dark:bg-[#091526]/60 motion-safe:animate-fade-in">
            {/* eslint-disable-next-line @next/next/no-img-element -- imágenes de ejemplo externas */}
            <img
                src={product.image}
                alt=""
                loading="lazy"
                className="w-20 h-20 rounded-xl object-cover shrink-0 bg-[#1B4F8A]/10"
            />

            <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                    <Link
                        href={getProductHref(product.slug)}
                        onClick={cart.close}
                        className="text-[14.5px] font-semibold leading-snug text-[#0F2D52] dark:text-[#EFF6FF] hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors line-clamp-2"
                    >
                        {product.title}
                    </Link>
                    <button
                        type="button"
                        onClick={() => cart.remove(product.slug)}
                        aria-label={`Rimuovi ${product.title} dal carrello`}
                        className="w-8 h-8 -mt-1 -mr-1 rounded-full flex items-center justify-center shrink-0 text-[#0F2D52]/50 dark:text-[#EFF6FF]/50 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    >
                        <Trash2 aria-hidden="true" className="w-4 h-4" />
                    </button>
                </div>

                <p className="mt-0.5 text-[13px] text-[#0F2D52]/60 dark:text-[#EFF6FF]/60">{product.format}</p>

                <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[12.5px] font-semibold bg-white dark:bg-[#11223A] text-[#0F2D52]/75 dark:text-[#EFF6FF]/75">
                        Qtà {quantity}
                    </span>
                    <span className="text-[15px] font-bold text-[#1B4F8A] dark:text-[#0EA5E9]">
                        {formatEuro(subtotal)}
                    </span>
                </div>
            </div>
        </li>
    );
}

export default memo(CartItem);
