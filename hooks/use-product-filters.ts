"use client";

import { useCallback, useMemo, useState } from "react";
import { DEFAULT_PRODUCT_FILTERS } from "@/config/products";
import type { Product, ProductFilters } from "@/interfaces/product.interface";
import { filterProducts } from "@/lib/products";
import { useDebouncedSearch } from "./use-debounced-search";
import { useInitialLoading } from "./use-initial-loading";

/** Estado de los filtros del catálogo + lista filtrada memoizada. */
export function useProductFilters(products: readonly Product[]) {
    const [filters, setFilters] = useState<ProductFilters>(DEFAULT_PRODUCT_FILTERS);
    const isInitialLoading = useInitialLoading();
    const { search, isTyping, isLoading: isSearchLoading } = useDebouncedSearch(filters.search);
    const isLoading = isInitialLoading || isSearchLoading;

    const setFilter = useCallback(
        <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
            setFilters((prev) => (prev[key] === value ? prev : { ...prev, [key]: value }));
        },
        []
    );

    const resetFilters = useCallback(() => setFilters(DEFAULT_PRODUCT_FILTERS), []);

    const { category, format } = filters;

    const filteredProducts = useMemo(
        () => filterProducts(products, { search, category, format }),
        [products, search, category, format]
    );

    const hasActiveFilters = useMemo(
        () =>
            (Object.keys(DEFAULT_PRODUCT_FILTERS) as (keyof ProductFilters)[]).some(
                (key) => filters[key] !== DEFAULT_PRODUCT_FILTERS[key]
            ),
        [filters]
    );

    return {
        filters,
        setFilter,
        resetFilters,
        filteredProducts,
        hasActiveFilters,
        /** El usuario sigue escribiendo en el buscador. */
        isTyping,
        /** Mostrar skeleton en la grilla (carga inicial o búsqueda). */
        isLoading,
    };
}
