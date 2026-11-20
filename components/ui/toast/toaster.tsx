"use client";

import { useToasts } from "@/hooks/use-toasts";
import ToastItem from "./toast-item";

export default function Toaster() {
    const toasts = useToasts();

    return (
        <div
            aria-live="polite"
            aria-label="Notifiche"
            className="pointer-events-none fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-[420px] flex flex-col items-center gap-2.5"
        >
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} />
            ))}
        </div>
    );
}
