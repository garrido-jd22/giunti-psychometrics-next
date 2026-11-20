"use client";

import { useEffect, useState } from "react";
import { INITIAL_LOAD_MS } from "@/config/search";

/** Simula una consulta inicial: `true` al montar y `false` tras `delay` ms. */
export function useInitialLoading(delay: number = INITIAL_LOAD_MS): boolean {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return isLoading;
}
