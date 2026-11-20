"use client";

import ProductFilters from "@/components/product/product-filters";
import ProductGrid from "@/components/product/product-grid";
import { PRODUCT_FORMAT_OPTIONS } from "@/config/products";
import { useProductFilters } from "@/hooks/use-product-filters";
import type { Product } from "@/interfaces/product.interface";
import type { ProductType } from "@/types/product.types";

interface ProductCatalogProps {
    type: ProductType;
    products: readonly Product[];
}

const NOUN: Record<ProductType, string> = { test: "test", course: "corsi" };

export default function ProductCatalog({ type, products }: ProductCatalogProps) {
    const { filters, setFilter, resetFilters, filteredProducts, hasActiveFilters, isTyping, isLoading } =
        useProductFilters(products);

    return (
        <>
            <ProductFilters
                filters={filters}
                formatOptions={PRODUCT_FORMAT_OPTIONS[type]}
                onChange={setFilter}
                onReset={resetFilters}
                hasActiveFilters={hasActiveFilters}
            />

            <p
                aria-live="polite"
                className="pt-6 text-[14.5px] text-[#0F2D52]/65 dark:text-[#EFF6FF]/65"
            >
                {isLoading ? "Ricerca in corso…" : `${filteredProducts.length} di ${products.length} ${NOUN[type]}`}
            </p>

            <div className={`pt-4 transition-opacity ${isTyping ? "opacity-60" : "opacity-100"}`}>
                <ProductGrid
                    products={filteredProducts}
                    isLoading={isLoading}
                    skeletonCount={Math.min(products.length, 6) || 3}
                />
            </div>
        </>
    );
}
