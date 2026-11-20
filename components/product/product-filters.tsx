"use client";

import { memo, useState } from "react";
import { Layers, Search, SlidersHorizontal, Tag } from "lucide-react";
import Select from "@/components/ui/select";
import { PRODUCT_CATEGORY_OPTIONS } from "@/config/products";
import type { FilterOption, ProductFilters as Filters } from "@/interfaces/product.interface";
import type { AllOption, ProductFormat } from "@/types/product.types";

interface ProductFiltersProps {
    filters: Filters;
    formatOptions: readonly FilterOption<ProductFormat | AllOption>[];
    onChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
    onReset: () => void;
    hasActiveFilters: boolean;
}

function Divider() {
    return (
        <span
            aria-hidden="true"
            className="hidden lg:inline-block h-5 w-px bg-[#1B4F8A]/15 dark:bg-[#EFF6FF]/15 mx-0.5"
        />
    );
}

const textButton =
    "text-[14.5px] font-medium underline underline-offset-4 text-[#0F2D52]/80 hover:text-[#0EA5E9] dark:text-[#EFF6FF]/80 dark:hover:text-[#0EA5E9] transition-colors cursor-pointer";

function ProductFilters({ filters, formatOptions, onChange, onReset, hasActiveFilters }: ProductFiltersProps) {
    const [showFilters, setShowFilters] = useState(true);

    return (
        <>
            <div className="pt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
                {showFilters ? (
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                        <div className="relative flex items-center w-full sm:w-64">
                            <Search
                                aria-hidden="true"
                                className="w-4 h-4 text-[#0F2D52]/50 dark:text-[#EFF6FF]/50 absolute left-4 pointer-events-none"
                            />
                            <input
                                type="search"
                                value={filters.search}
                                onChange={(e) => onChange("search", e.target.value)}
                                placeholder="Cerca per nome..."
                                aria-label="Cerca prodotti"
                                className="h-10 w-full pl-10 pr-4 rounded-full text-[14.5px] bg-white/80 dark:bg-[#11223A]/85 backdrop-blur-md text-[#0F2D52] dark:text-[#EFF6FF] placeholder:text-[#0F2D52]/50 dark:placeholder:text-[#EFF6FF]/50 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] transition-all"
                            />
                        </div>

                        <Divider />

                        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
                            <Select
                                label="Formato prodotto"
                                icon={Layers}
                                value={filters.format}
                                options={formatOptions}
                                onChange={(value) => onChange("format", value)}
                                variant="primary"
                            />
                            <Select
                                label="Categoria"
                                icon={Tag}
                                value={filters.category}
                                options={PRODUCT_CATEGORY_OPTIONS}
                                onChange={(value) => onChange("category", value)}
                            />
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setShowFilters(true)}
                        className="self-start inline-flex items-center gap-2 h-10 px-5 rounded-full text-[14.5px] font-semibold bg-white/80 dark:bg-[#11223A]/85 backdrop-blur-md text-[#1B4F8A] dark:text-[#0EA5E9] hover:text-[#0EA5E9] transition-colors cursor-pointer shadow-xs"
                    >
                        <SlidersHorizontal aria-hidden="true" className="w-4 h-4" />
                        Mostra filtri
                    </button>
                )}

                <div className="flex items-center gap-4">
                    {showFilters && (
                        <button type="button" onClick={() => setShowFilters(false)} className={textButton}>
                            Nascondi
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onReset}
                        disabled={!hasActiveFilters}
                        className="ml-auto h-10 px-5 rounded-full text-[14.5px] font-medium bg-white/75 dark:bg-[#11223A]/75 backdrop-blur-md text-[#0F2D52]/75 hover:text-[#0EA5E9] dark:text-[#EFF6FF]/75 dark:hover:text-[#0EA5E9] transition-colors cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-[#0F2D52]/75 dark:disabled:hover:text-[#EFF6FF]/75"
                    >
                        Reimposta filtri
                    </button>
                </div>
            </div>

            <div className="pt-5 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 flex gap-2 overflow-x-auto [scrollbar-width:none] md:flex-wrap md:overflow-visible">
                {PRODUCT_CATEGORY_OPTIONS.map((option) => {
                    const isActive = filters.category === option.value;
                    return (
                        <button
                            key={option.value}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => onChange("category", option.value)}
                            className={`shrink-0 whitespace-nowrap h-9 px-4 rounded-full text-[14px] font-medium transition-colors cursor-pointer ${isActive
                                ? "bg-[#1B4F8A] text-white dark:bg-[#0EA5E9] dark:text-[#091526]"
                                : "bg-white/75 dark:bg-[#11223A]/80 text-[#0F2D52]/80 dark:text-[#EFF6FF]/80 hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9]"
                                }`}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </>
    );
}

export default memo(ProductFilters);
