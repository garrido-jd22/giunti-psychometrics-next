"use client";

import { useEffect, useId, useRef } from "react";
import { Check, ChevronDown, type LucideIcon } from "lucide-react";
import { useSelect } from "@/hooks/use-select";
import type { FilterOption } from "@/interfaces/product.interface";

interface SelectProps<T extends string> {
    label: string;
    value: T;
    options: readonly FilterOption<T>[];
    onChange: (value: T) => void;
    icon?: LucideIcon;
    variant?: "default" | "primary";
}

const triggerVariants = {
    default:
        "font-medium bg-white/80 dark:bg-[#11223A]/85 backdrop-blur-md text-[#0F2D52] dark:text-[#EFF6FF] hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9]",
    primary: "font-semibold bg-[#1B4F8A] text-white hover:bg-[#0EA5E9]",
};

export default function Select<T extends string>({
    label,
    value,
    options,
    onChange,
    icon: Icon,
    variant = "default",
}: SelectProps<T>) {
    const { open, activeIndex, setActiveIndex, selectedIndex, containerRef, toggle, select, onKeyDown } =
        useSelect({ options, value, onChange });

    const listboxId = useId();
    const optionId = (index: number) => `${listboxId}-option-${index}`;
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!open || activeIndex < 0) return;
        listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
    }, [open, activeIndex]);

    const isPrimary = variant === "primary";

    return (
        <div ref={containerRef} className="relative w-full sm:w-auto">
            <button
                type="button"
                role="combobox"
                aria-label={label}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listboxId}
                aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
                onClick={toggle}
                onKeyDown={onKeyDown}
                className={`w-full h-10 pl-4 pr-3 rounded-full flex items-center gap-2 text-[14.5px] shadow-xs cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] ${open ? "ring-2 ring-[#0EA5E9]/60" : ""} ${triggerVariants[variant]}`}
            >
                {Icon && (
                    <Icon
                        aria-hidden="true"
                        className={`w-4 h-4 shrink-0 ${isPrimary ? "text-white/80" : "text-[#0EA5E9]"}`}
                    />
                )}
                <span className="flex-1 min-w-0 truncate text-left">
                    {options[selectedIndex]?.label ?? label}
                </span>
                <ChevronDown
                    aria-hidden="true"
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""} ${isPrimary ? "text-white" : "text-[#0F2D52]/60 dark:text-[#EFF6FF]/60"}`}
                />
            </button>

            {open && (
                <ul
                    ref={listRef}
                    id={listboxId}
                    role="listbox"
                    aria-label={label}
                    className="absolute z-30 top-full left-0 right-0 sm:right-auto mt-2 sm:min-w-full sm:w-max sm:max-w-[320px] max-h-72 overflow-y-auto p-1.5 rounded-2xl bg-white/95 dark:bg-[#11223A]/95 backdrop-blur-md border border-[#1B4F8A]/10 dark:border-[#EFF6FF]/10 shadow-[0_18px_45px_rgb(15,45,82,0.16)] dark:shadow-[0_18px_45px_rgb(0,0,0,0.45)] origin-top motion-safe:animate-dropdown-in"
                >
                    {options.map((option, index) => {
                        const isSelected = index === selectedIndex;
                        const isActive = index === activeIndex;
                        return (
                            <li
                                key={option.value}
                                id={optionId(index)}
                                role="option"
                                aria-selected={isSelected}
                                onMouseDown={(e) => e.preventDefault()}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => select(index)}
                                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[14.5px] cursor-pointer transition-colors ${isActive ? "bg-[#EFF6FF] dark:bg-[#091526]/80" : ""} ${isSelected
                                    ? "font-semibold text-[#1B4F8A] dark:text-[#0EA5E9]"
                                    : "text-[#0F2D52]/85 dark:text-[#EFF6FF]/85"
                                    }`}
                            >
                                <span>{option.label}</span>
                                <Check
                                    aria-hidden="true"
                                    className={`w-4 h-4 shrink-0 text-[#0EA5E9] ${isSelected ? "opacity-100" : "opacity-0"}`}
                                    strokeWidth={2.4}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
