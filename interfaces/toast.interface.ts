import type { ToastVariant } from "@/types/toast.types";

export interface Toast {
    id: string;
    variant: ToastVariant;
    title: string;
    description?: string;
    /** Milisegundos antes de cerrarse solo. `Infinity` = no se cierra solo. */
    duration: number;
    /** `false` mientras corre la animación de salida. */
    open: boolean;
}

export interface ToastOptions {
    description?: string;
    duration?: number;
}
