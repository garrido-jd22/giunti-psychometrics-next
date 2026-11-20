/** Servicio de toasts: store externo (sin Provider) + API imperativa. */
import type { Toast, ToastOptions } from "@/interfaces/toast.interface";
import type { ToastVariant } from "@/types/toast.types";

const DEFAULT_DURATION = 4000;
const EXIT_ANIMATION_MS = 200;
const MAX_TOASTS = 4;
const EMPTY: Toast[] = [];

let toasts: Toast[] = EMPTY;
let counter = 0;
const listeners = new Set<() => void>();

function emit() {
    listeners.forEach((listener) => listener());
}

function setToasts(next: Toast[]) {
    toasts = next;
    emit();
}

export const toastStore = {
    subscribe(listener: () => void) {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    },
    getSnapshot: () => toasts,
    getServerSnapshot: () => EMPTY,
};

function show(variant: ToastVariant, title: string, options: ToastOptions = {}): string {
    const id = `toast-${++counter}`;
    const next: Toast = {
        id,
        variant,
        title,
        description: options.description,
        duration: options.duration ?? DEFAULT_DURATION,
        open: true,
    };
    // Los más antiguos salen si se supera el máximo.
    setToasts([...toasts, next].slice(-MAX_TOASTS));
    return id;
}

/** Inicia la animación de salida y luego elimina el toast. */
function dismiss(id: string) {
    if (!toasts.some((t) => t.id === id && t.open)) return;
    setToasts(toasts.map((t) => (t.id === id ? { ...t, open: false } : t)));
    setTimeout(() => setToasts(toasts.filter((t) => t.id !== id)), EXIT_ANIMATION_MS);
}

export const toast = {
    show,
    dismiss,
    success: (title: string, options?: ToastOptions) => show("success", title, options),
    error: (title: string, options?: ToastOptions) => show("error", title, options),
    warning: (title: string, options?: ToastOptions) => show("warning", title, options),
    info: (title: string, options?: ToastOptions) => show("info", title, options),
    primary: (title: string, options?: ToastOptions) => show("primary", title, options),
    secondary: (title: string, options?: ToastOptions) => show("secondary", title, options),
};
