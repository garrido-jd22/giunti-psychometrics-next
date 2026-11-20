"use client";

import { useCallback, useLayoutEffect, useSyncExternalStore } from "react";
import {
    applyTheme,
    getAppliedTheme,
    resolveTheme,
    setTheme as setThemeService,
    subscribeToTheme,
    toggleTheme as toggleThemeService,
    type Theme,
} from "@/lib/services/theme.service";

/** Hook para leer y cambiar el tema desde componentes cliente. */
export function useTheme() {
    const theme = useSyncExternalStore<Theme | null>(
        subscribeToTheme,
        getAppliedTheme,
        () => null
    );

    // Strict Mode borra la clase de <html>: se re-aplica antes del pintado.
    useLayoutEffect(() => {
        applyTheme(resolveTheme());
    }, []);

    const setTheme = useCallback((next: Theme) => setThemeService(next), []);
    const toggleTheme = useCallback(() => toggleThemeService(), []);

    return { theme, setTheme, toggleTheme };
}
