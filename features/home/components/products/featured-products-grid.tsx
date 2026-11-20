"use client";

import ProductGrid from "@/components/product/product-grid";
import { useInitialLoading } from "@/hooks/use-initial-loading";
import type { Product } from "@/interfaces/product.interface";

interface FeaturedProductsGridProps {
    products: readonly Product[];
}

export default function FeaturedProductsGrid({ products }: FeaturedProductsGridProps) {
    const isLoading = useInitialLoading();

    return (
        <ProductGrid products={products} isLoading={isLoading} skeletonCount={products.length} />
    );
}
