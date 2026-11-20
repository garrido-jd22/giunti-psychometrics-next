"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Ejecuta `handler` al hacer clic/tocar fuera del elemento referenciado. */
export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T | null>,
    handler: () => void,
    enabled = true
) {
    // Guardamos el handler en un ref para no re-suscribir el listener en cada render.
    const handlerRef = useRef(handler);
    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        if (!enabled) return;

        const onPointerDown = (event: PointerEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handlerRef.current();
            }
        };

        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [ref, enabled]);
}
