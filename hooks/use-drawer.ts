"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Panel modal: Esc cierra, bloquea el scroll y gestiona el foco. */
export function useDrawer(
    isOpen: boolean,
    onClose: () => void,
    initialFocusRef: RefObject<HTMLElement | null>
) {
    const onCloseRef = useRef(onClose);
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;
        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";
        initialFocusRef.current?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onCloseRef.current();
        };
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = overflow;
            previouslyFocused?.focus();
        };
    }, [isOpen, initialFocusRef]);
}
