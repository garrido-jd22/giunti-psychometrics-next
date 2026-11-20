"use client";

import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import type { FilterOption } from "@/interfaces/product.interface";
import { useClickOutside } from "./use-click-outside";

interface UseSelectOptions<T extends string> {
    options: readonly FilterOption<T>[];
    value: T;
    onChange: (value: T) => void;
}

/** Lógica de un select accesible (listbox WAI-ARIA) con teclado. */
export function useSelect<T extends string>({ options, value, onChange }: UseSelectOptions<T>) {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedIndex = options.findIndex((option) => option.value === value);
    const lastIndex = options.length - 1;

    const openMenu = useCallback(() => {
        setActiveIndex(Math.max(selectedIndex, 0));
        setOpen(true);
    }, [selectedIndex]);

    const close = useCallback(() => setOpen(false), []);

    useClickOutside(containerRef, close, open);

    const toggle = useCallback(() => (open ? close() : openMenu()), [open, close, openMenu]);

    const select = useCallback(
        (index: number) => {
            const option = options[index];
            if (option && option.value !== value) onChange(option.value);
            setOpen(false);
        },
        [options, value, onChange]
    );

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                if (open) setActiveIndex((i) => Math.min(i + 1, lastIndex));
                else openMenu();
                break;
            case "ArrowUp":
                event.preventDefault();
                if (open) setActiveIndex((i) => Math.max(i - 1, 0));
                else openMenu();
                break;
            case "Home":
                if (open) {
                    event.preventDefault();
                    setActiveIndex(0);
                }
                break;
            case "End":
                if (open) {
                    event.preventDefault();
                    setActiveIndex(lastIndex);
                }
                break;
            case "Enter":
            case " ":
                event.preventDefault();
                if (open) select(activeIndex);
                else openMenu();
                break;
            case "Escape":
                if (open) {
                    event.preventDefault();
                    close();
                }
                break;
            case "Tab":
                close();
                break;
        }
    };

    return {
        open,
        activeIndex,
        setActiveIndex,
        selectedIndex,
        containerRef,
        toggle,
        select,
        onKeyDown,
    };
}
