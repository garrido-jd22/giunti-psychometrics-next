import type {
    AllOption,
    ProductActionType,
    ProductCategory,
    ProductFormat,
    ProductType,
} from "@/types/product.types";

/** Rango de edad (tests) o fecha de inicio (cursos). */
export type ProductMeta =
    | { type: "age"; label: string }
    | { type: "date"; startDate: string /* ISO YYYY-MM-DD */ };

export interface Product {
    /** Identificador único y segmento de la URL: /products/[slug] */
    slug: string;
    type: ProductType;
    title: string;
    description: string;
    author: string;
    authorRole: string;
    category: ProductCategory;
    format: ProductFormat;
    meta: ProductMeta;
    /** Precio final en euros. */
    price: number;
    /** Precio antes del descuento; si no existe, no se muestra tachado. */
    originalPrice?: number;
    image: string;
    actionType: ProductActionType;
    /** Se muestra en la sección destacada de la home. */
    featured?: boolean;
}

export interface ProductFilters {
    search: string;
    category: ProductCategory | AllOption;
    format: ProductFormat | AllOption;
}

export interface FilterOption<T extends string> {
    value: T;
    label: string;
}

/** Pestaña del catálogo: una por tipo de producto. */
export interface ProductTab extends FilterOption<ProductType> {
    href: string;
}
