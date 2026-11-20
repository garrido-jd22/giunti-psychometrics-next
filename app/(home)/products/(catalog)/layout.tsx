import { Suspense } from "react";
import ProductTabs, { ProductTabsView } from "@/features/products/components/product-tabs";
import { PRODUCT_TABS } from "@/config/products";
import { PRODUCTS } from "@/lib/data/products";
import { getProductsByType } from "@/lib/products";
import type { ProductType } from "@/types/product.types";

const counts = Object.fromEntries(
    PRODUCT_TABS.map((tab) => [tab.value, getProductsByType(PRODUCTS, tab.value).length])
) as Record<ProductType, number>;

export default function ProductsLayout({ children }: LayoutProps<"/products">) {
    return (
        <section className="w-full min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-[#EFF6FF] text-[#0F2D52] dark:bg-[#091526] dark:text-[#EFF6FF] transition-colors duration-300 font-sans">
            <div className="max-w-[1220px] mx-auto">
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between pb-5 border-b border-[#1B4F8A]/15 dark:border-[#EFF6FF]/15">
                    <div className="motion-safe:animate-fade-down">
                        <h1 className="text-[26px] sm:text-[30px] lg:text-[34px] font-semibold tracking-tight leading-tight text-[#0F2D52] dark:text-[#EFF6FF]">
                            Catalogo Prodotti
                        </h1>
                        <p className="mt-1.5 text-[15px] text-[#0F2D52]/65 dark:text-[#EFF6FF]/65">
                            Test psicometrici e percorsi di formazione per professionisti.
                        </p>
                    </div>

                    <div className="w-full sm:w-auto motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
                        <Suspense fallback={<ProductTabsView counts={counts} />}>
                            <ProductTabs counts={counts} />
                        </Suspense>
                    </div>
                </div>

                {children}
            </div>
        </section>
    );
}
