"use client";

import { useSyncExternalStore } from "react";
import { toastStore } from "@/lib/services/toast.service";

/** Lista reactiva de toasts activos. Se muestran con `toast.*`. */
export function useToasts() {
    return useSyncExternalStore(
        toastStore.subscribe,
        toastStore.getSnapshot,
        toastStore.getServerSnapshot
    );
}
