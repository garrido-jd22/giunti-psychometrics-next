"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ClipboardList, GraduationCap, type LucideIcon } from "lucide-react";
import { PRODUCT_TABS, PRODUCT_TYPE_PARAM } from "@/config/products";
import { parseProductType } from "@/lib/products";
import type { ProductType } from "@/types/product.types";

const TAB_ICONS: Record<ProductType, LucideIcon> = {
    test: ClipboardList,
    course: GraduationCap,
};

interface ProductTabsViewProps {
    activeType?: ProductType;
    counts: Record<ProductType, number>;
}

export function ProductTabsView({ activeType, counts }: ProductTabsViewProps) {
    return (
        <nav aria-label="Tipo di prodotto" className="w-full sm:w-auto">
            <ul className="flex w-full sm:w-auto gap-1 p-1 rounded-full bg-white/70 dark:bg-[#11223A]/80 backdrop-blur-md shadow-xs">
                {PRODUCT_TABS.map((tab) => {
                    const Icon = TAB_ICONS[tab.value];
                    const isActive = tab.value === activeType;
                    return (
                        <li key={tab.value} className="flex-1 sm:flex-none">
                            <Link
                                href={tab.href}
                                scroll={false}
                                aria-current={isActive ? "page" : undefined}
                                className={`h-10 px-4 sm:px-5 rounded-full flex items-center justify-center gap-2 text-[14.5px] font-semibold whitespace-nowrap transition-colors ${isActive
                                    ? "bg-[#1B4F8A] text-white dark:bg-[#0EA5E9] dark:text-[#091526] shadow-sm"
                                    : "text-[#0F2D52]/75 hover:text-[#0EA5E9] dark:text-[#EFF6FF]/75 dark:hover:text-[#0EA5E9]"
                                    }`}
                            >
                                <Icon aria-hidden="true" className="w-4 h-4 shrink-0" />
                                {tab.label}
                                <span
                                    className={`min-w-6 h-6 px-1.5 rounded-full text-[12.5px] font-bold flex items-center justify-center ${isActive
                                        ? "bg-white/20 dark:bg-[#091526]/15"
                                        : "bg-[#1B4F8A]/10 dark:bg-[#EFF6FF]/10"
                                        }`}
                                >
                                    {counts[tab.value]}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default function ProductTabs({ counts }: Pick<ProductTabsViewProps, "counts">) {
    const searchParams = useSearchParams();
    const activeType = parseProductType(searchParams.get(PRODUCT_TYPE_PARAM));
    return <ProductTabsView activeType={activeType} counts={counts} />;
}
