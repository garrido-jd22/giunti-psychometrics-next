/** Servicio del carrito: store externo (sin Provider) + API imperativa. */
import type { CartItem, CartState } from "@/interfaces/cart.interface";

const STORAGE_KEY = "gp-cart";
const SERVER_STATE: CartState = { items: [], isOpen: false };

let state: CartState = SERVER_STATE;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
    listeners.forEach((listener) => listener());
}

function setState(next: Partial<CartState>, persist = false) {
    state = { ...state, ...next };
    if (persist) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
        } catch {
            // Sin localStorage: el carrito sigue en memoria.
        }
    }
    emit();
}

function readStorage(): CartItem[] {
    try {
        const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(
            (item): item is CartItem =>
                typeof item?.slug === "string" && Number.isInteger(item?.quantity) && item.quantity > 0
        );
    } catch {
        return [];
    }
}

function onStorage(event: StorageEvent) {
    // Sincroniza el carrito entre pestañas.
    if (event.key === STORAGE_KEY) setState({ items: readStorage() });
}

export const cartStore = {
    subscribe(listener: () => void) {
        listeners.add(listener);
        // Se lee tras hidratar para que el HTML del servidor coincida.
        if (!hydrated) {
            hydrated = true;
            window.addEventListener("storage", onStorage);
            setState({ items: readStorage() });
        }
        return () => {
            listeners.delete(listener);
        };
    },
    getSnapshot: () => state,
    getServerSnapshot: () => SERVER_STATE,
};

function add(slug: string, quantity = 1) {
    const exists = state.items.some((item) => item.slug === slug);
    const items = exists
        ? state.items.map((item) =>
              item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item
          )
        : [...state.items, { slug, quantity }];
    setState({ items }, true);
}

function remove(slug: string) {
    setState({ items: state.items.filter((item) => item.slug !== slug) }, true);
}

export const cart = {
    add,
    remove,
    open: () => setState({ isOpen: true }),
    close: () => setState({ isOpen: false }),
    toggle: () => setState({ isOpen: !state.isOpen }),
};
