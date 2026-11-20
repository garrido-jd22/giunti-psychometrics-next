import { DEFAULT_PRODUCT_TYPE, PRODUCT_TABS } from "@/config/products";
import type { Product, ProductFilters } from "@/interfaces/product.interface";
import type { ProductType } from "@/types/product.types";

// Formateadores creados una sola vez.
const euroFormatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
});

// UTC: evita que la fecha cambie de día entre servidor y cliente.
const dateFormatter = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
});

export function formatEuro(value: number): string {
    return euroFormatter.format(value);
}

export function formatDate(isoDate: string): string {
    return dateFormatter.format(new Date(isoDate));
}

export function getInitials(name: string): string {
    return name
        .split(/[\s,]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]!.toUpperCase())
        .join("");
}

/** Minúsculas y sin acentos, para que "eta" encuentre "Età". */
function normalize(text: string): string {
    return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

/** Búsqueda solo por nombre (título), usada en el popover del header. */
export function searchProductsByName(products: readonly Product[], search: string): Product[] {
    const query = normalize(search);
    if (!query) return [];
    return products.filter((product) => normalize(product.title).includes(query));
}

/** Función pura: fácil de testear y de memoizar desde el hook. */
export function filterProducts(products: readonly Product[], filters: ProductFilters): Product[] {
    const query = normalize(filters.search);

    return products.filter((product) => {
        if (filters.category !== "all" && product.category !== filters.category) return false;
        if (filters.format !== "all" && product.format !== filters.format) return false;

        if (query) {
            const haystack = normalize(`${product.title} ${product.description} ${product.author}`);
            if (!haystack.includes(query)) return false;
        }

        return true;
    });
}

/** Convierte el query param `?type=` en un tipo válido. */
export function parseProductType(value: string | string[] | null | undefined): ProductType {
    const raw = Array.isArray(value) ? value[0] : value;
    return PRODUCT_TABS.find((tab) => tab.value === raw)?.value ?? DEFAULT_PRODUCT_TYPE;
}

export function getProductsByType(products: readonly Product[], type: ProductType): Product[] {
    return products.filter((product) => product.type === type);
}

/** URL del detalle de un producto. */
export function getProductHref(slug: string): string {
    return `/products/${slug}`;
}

/** Descuento en % (redondeado) o null si no hay precio original. */
export function getDiscountPercent(product: Product): number | null {
    if (!product.originalPrice || product.originalPrice <= product.price) return null;
    return Math.round((1 - product.price / product.originalPrice) * 100);
}
