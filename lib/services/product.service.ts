import type { Product } from "@/interfaces/product.interface";
import { PRODUCTS } from "@/lib/data/products";

// Índice por slug creado una sola vez: búsqueda O(1) en el detalle y en el carrito.
const PRODUCTS_BY_SLUG = new Map(PRODUCTS.map((product) => [product.slug, product]));

/** Cuando exista una API, sustituir por un fetch a /products/:slug. */
export function getProductBySlug(slug: string): Product | undefined {
    return PRODUCTS_BY_SLUG.get(slug);
}
