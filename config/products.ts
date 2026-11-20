import type {
    FilterOption,
    ProductFilters,
    ProductTab,
} from "@/interfaces/product.interface";
import type {
    AllOption,
    ProductCategory,
    ProductFormat,
    ProductType,
} from "@/types/product.types";

/** Nombre del query param que elige la pestaña: /products?type=test */
export const PRODUCT_TYPE_PARAM = "type";

/** Pestaña seleccionada cuando la ruta es solo /products. */
export const DEFAULT_PRODUCT_TYPE: ProductType = "test";

export const PRODUCT_TABS: readonly ProductTab[] = [
    { value: "test", label: "Test", href: `/products?${PRODUCT_TYPE_PARAM}=test` },
    { value: "course", label: "Formazione", href: `/products?${PRODUCT_TYPE_PARAM}=course` },
];

export const PRODUCT_CATEGORY_OPTIONS: FilterOption<ProductCategory | AllOption>[] = [
    { value: "all", label: "Tutti" },
    { value: "Clinica e Neuropsicologia", label: "Clinica e Neuropsicologia" },
    { value: "Scuola ed Età evolutiva", label: "Scuola ed Età evolutiva" },
    { value: "Lavoro e Organizzazioni", label: "Lavoro e Organizzazioni" },
];

/** Cada tipo tiene sus propios formatos (un test no es "In presenza"). */
export const PRODUCT_FORMAT_OPTIONS: Record<ProductType, FilterOption<ProductFormat | AllOption>[]> = {
    test: [
        { value: "all", label: "Tutti i formati" },
        { value: "Cartaceo", label: "Cartaceo" },
        { value: "Digitale", label: "Digitale" },
    ],
    course: [
        { value: "all", label: "Tutti i formati" },
        { value: "Corso online", label: "Corso online" },
        { value: "In presenza", label: "In presenza" },
    ],
};

/** Ventajas que se muestran junto al botón de compra en el detalle. */
export const PRODUCT_PERKS: Record<ProductType, readonly string[]> = {
    test: ["Materiale ufficiale e aggiornato", "Spedizione gratuita in 48 ore", "Assistenza all'uso dello strumento"],
    course: ["Attestato di partecipazione", "Accesso ai materiali del corso", "Docenti esperti del settore"],
};

export const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
    search: "",
    category: "all",
    format: "all",
};
