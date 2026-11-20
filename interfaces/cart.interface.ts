import type { Product } from "./product.interface";

/** Lo que se guarda: solo el slug y la cantidad (los datos se leen del catálogo). */
export interface CartItem {
    slug: string;
    quantity: number;
}

export interface CartState {
    items: readonly CartItem[];
    /** Panel lateral del carrito abierto. */
    isOpen: boolean;
}

/** Línea del carrito con el producto ya resuelto, lista para pintar. */
export interface CartLine {
    product: Product;
    quantity: number;
    /** price × quantity */
    subtotal: number;
}
