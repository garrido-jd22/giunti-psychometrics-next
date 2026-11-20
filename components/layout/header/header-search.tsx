"use client";

import { memo, useCallback, useId, useRef, useState } from "react";
import Link from "next/link";
import { Search, SearchX } from "lucide-react";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import { HEADER_SEARCH_LIMIT } from "@/config/search";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useProductSearch } from "@/hooks/use-product-search";
import type { Product } from "@/interfaces/product.interface";
import { PRODUCTS } from "@/lib/data/products";
import { getProductHref } from "@/lib/products";

const SearchResultItem = memo(function SearchResultItem({
    product,
    onSelect,
}: {
    product: Product;
    onSelect: () => void;
}) {
    return (
        <li className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#EFF6FF] dark:hover:bg-[#091526]/70 transition-colors">
            <Link href={getProductHref(product.slug)} onClick={onSelect} className="flex items-center gap-3 min-w-0 flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element -- imágenes de ejemplo externas */}
                <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#1B4F8A]/10"
                />
                <div className="min-w-0 flex-1">
                    <p className="text-[14.5px] font-semibold leading-snug text-[#0F2D52] dark:text-[#EFF6FF] line-clamp-1">
                        {product.title}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-snug text-[#0F2D52]/65 dark:text-[#EFF6FF]/65 line-clamp-2">
                        {product.description}
                    </p>
                </div>
            </Link>
            <AddToCartButton product={product} variant="icon" />
        </li>
    );
});

function SearchResultSkeleton() {
    const block = "rounded-full bg-[#1B4F8A]/10 dark:bg-[#EFF6FF]/10";
    return (
        <li aria-hidden="true" className="flex items-center gap-3 p-2.5 animate-pulse">
            <div className="w-14 h-14 rounded-xl shrink-0 bg-[#1B4F8A]/10 dark:bg-[#EFF6FF]/10" />
            <div className="flex-1">
                <div className={`h-3.5 w-3/4 ${block}`} />
                <div className={`mt-2 h-3 w-full ${block}`} />
                <div className={`mt-1.5 h-3 w-2/3 ${block}`} />
            </div>
            <div className={`w-9 h-9 shrink-0 ${block}`} />
        </li>
    );
}

export default function HeaderSearch() {
    const containerRef = useRef<HTMLDivElement>(null);
    const popoverId = useId();
    const [isOpen, setIsOpen] = useState(false);

    const { query, setQuery, results, hasQuery, isTyping, isLoading } = useProductSearch(
        PRODUCTS,
        HEADER_SEARCH_LIMIT
    );

    const close = useCallback(() => setIsOpen(false), []);
    useClickOutside(containerRef, close, isOpen);

    const showPopover = isOpen && hasQuery;
    const showSkeleton = isLoading || (isTyping && results.length === 0);

    return (
        <div ref={containerRef} role="search" className="relative hidden lg:flex items-center">
            <Search
                aria-hidden="true"
                className="w-4 h-4 absolute left-3.5 pointer-events-none text-[#0F2D52]/50 dark:text-[#EFF6FF]/50"
            />
            <input
                type="search"
                name="q"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={(e) => {
                    if (e.key === "Escape") close();
                }}
                placeholder="Cerca prodotti..."
                role="combobox"
                aria-autocomplete="list"
                aria-label="Cerca prodotti per nome"
                aria-expanded={showPopover}
                aria-controls={popoverId}
                autoComplete="off"
                className="h-9 w-48 xl:w-60 pl-10 pr-4 rounded-full text-[14.5px] bg-white/70 dark:bg-[#11223A]/80 text-[#0F2D52] dark:text-[#EFF6FF] placeholder:text-[#0F2D52]/50 dark:placeholder:text-[#EFF6FF]/50 border border-[#1B4F8A]/20 dark:border-[#EFF6FF]/15 focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/30 transition-all"
            />

            {showPopover && (
                <div
                    id={popoverId}
                    className="absolute top-full right-0 mt-4 w-[400px] max-h-[70vh] overflow-y-auto rounded-3xl p-2 bg-white/95 dark:bg-[#11223A]/95 backdrop-blur-md border border-[#1B4F8A]/10 dark:border-[#EFF6FF]/10 shadow-[0_18px_45px_rgb(15,45,82,0.18)] dark:shadow-[0_18px_45px_rgb(0,0,0,0.45)]"
                >
                    <p
                        aria-live="polite"
                        className="px-3 pt-2 pb-1 text-[12.5px] font-semibold uppercase tracking-wide text-[#0F2D52]/50 dark:text-[#EFF6FF]/50"
                    >
                        {showSkeleton ? "Ricerca in corso…" : `${results.length} risultati`}
                    </p>

                    {showSkeleton ? (
                        <ul role="status" aria-label="Caricamento risultati">
                            {Array.from({ length: 3 }, (_, i) => (
                                <SearchResultSkeleton key={i} />
                            ))}
                        </ul>
                    ) : results.length > 0 ? (
                        <ul className={`transition-opacity ${isTyping ? "opacity-60" : "opacity-100"}`}>
                            {results.map((product) => (
                                <SearchResultItem key={product.slug} product={product} onSelect={close} />
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center gap-2 py-8 text-center text-[#0F2D52]/65 dark:text-[#EFF6FF]/65">
                            <SearchX className="w-6 h-6 text-[#0EA5E9]" strokeWidth={1.6} />
                            <p className="text-[14px]">Nessun prodotto trovato.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
