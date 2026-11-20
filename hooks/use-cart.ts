"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { CartLine } from "@/interfaces/cart.interface";
import { cartStore } from "@/lib/services/cart.service";
import { getProductBySlug } from "@/lib/services/product.service";

/** Estado reactivo del carrito con los productos ya resueltos. */
export function useCart() {
    const { items, isOpen } = useSyncExternalStore(
        cartStore.subscribe,
        cartStore.getSnapshot,
        cartStore.getServerSnapshot
    );

    return useMemo(() => {
        const lines: CartLine[] = [];
        for (const item of items) {
            // Si un producto guardado ya no existe en el catálogo, se ignora.
            const product = getProductBySlug(item.slug);
            if (product) {
                lines.push({ product, quantity: item.quantity, subtotal: product.price * item.quantity });
            }
        }
        return {
            lines,
            isOpen,
            /** Unidades totales (para el contador del icono). */
            count: lines.reduce((sum, line) => sum + line.quantity, 0),
            total: lines.reduce((sum, line) => sum + line.subtotal, 0),
        };
    }, [items, isOpen]);
}
