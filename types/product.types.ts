/** Tipo de producto: decide la pestaña del catálogo (/products?type=...). */
export type ProductType = "test" | "course";

export type ProductFormat = "Cartaceo" | "Digitale" | "Corso online" | "In presenza";

export type ProductCategory =
    | "Clinica e Neuropsicologia"
    | "Scuola ed Età evolutiva"
    | "Lavoro e Organizzazioni";

export type ProductActionType = "cart" | "details";

/** Valor centinela para "sin filtro" en los selects. */
export type AllOption = "all";
