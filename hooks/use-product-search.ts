"use client";

import { useCallback, useMemo, useState } from "react";
import type { Product } from "@/interfaces/product.interface";
import { searchProductsByName } from "@/lib/products";
import { useDebouncedSearch } from "./use-debounced-search";

/** Búsqueda rápida por nombre (popover del header). */
export function useProductSearch(products: readonly Product[], limit: number) {
    const [query, setQuery] = useState("");
    const { search, isTyping, isLoading } = useDebouncedSearch(query);

    const results = useMemo(
        () => (search.trim() ? searchProductsByName(products, search).slice(0, limit) : []),
        [products, search, limit]
    );

    const clear = useCallback(() => setQuery(""), []);

    return {
        query,
        setQuery,
        clear,
        results,
        /** Hay texto con el que buscar (lo escrito, no lo aplicado). */
        hasQuery: query.trim().length > 0,
        isTyping,
        isLoading,
    };
}
