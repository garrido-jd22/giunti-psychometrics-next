"use client";

import { SEARCH_DEBOUNCE_MS, SEARCH_LOADING_MS } from "@/config/search";
import { useDebouncedValue } from "./use-debounced-value";

/** Búsqueda con debounce: tecla → espera → skeleton → resultados. */
export function useDebouncedSearch(query: string) {
    const applied = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
    const settled = useDebouncedValue(applied, SEARCH_LOADING_MS);

    return {
        /** Búsqueda final con la que filtrar. */
        search: settled,
        /** El usuario sigue escribiendo (aún no pasó el debounce). */
        isTyping: query !== applied,
        /** Mostrar skeleton: la búsqueda se aplicó y está "cargando". */
        isLoading: applied !== settled,
    };
}
