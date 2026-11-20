import { SearchX } from "lucide-react";
import type { Product } from "@/interfaces/product.interface";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";

interface ProductGridProps {
    products: readonly Product[];
    emptyMessage?: string;
    isLoading?: boolean;
    skeletonCount?: number;
}

const gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7";

const STAGGER_MS = 80;

export default function ProductGrid({
    products,
    emptyMessage = "Nessun prodotto corrisponde ai filtri selezionati.",
    isLoading = false,
    skeletonCount = 6,
}: ProductGridProps) {
    if (isLoading) {
        return (
            <div className={gridClass} role="status" aria-label="Caricamento prodotti">
                {Array.from({ length: skeletonCount }, (_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-[#0F2D52]/70 dark:text-[#EFF6FF]/70">
                <SearchX className="w-8 h-8 text-[#0EA5E9]" strokeWidth={1.6} />
                <p className="text-[15.5px]">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className={gridClass}>
            {products.map((product, index) => (
                <div
                    key={product.slug}
                    className="grid motion-safe:animate-fade-up"
                    style={{ animationDelay: `${index * STAGGER_MS}ms` }}
                >
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
}
